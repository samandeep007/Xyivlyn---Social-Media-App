import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from '../users/users.service';
import {
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
} from './auth.constants';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './types/auth-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmailForAuth(dto.email);
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
    });

    const user = await this.usersService.createWithPassword(
      dto.email,
      passwordHash,
    );

    return this.createSession(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailForAuth(dto.email);

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createSession(user.id, user.email);
  }

  async refresh(dto: RefreshTokenDto) {
    const payload = await this.verifyRefreshToken(dto.refreshToken);

    const session = await this.prisma.authSession.findUnique({
      where: { id: payload.sid },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (
      !session ||
      session.userId !== payload.sub ||
      session.revokedAt ||
      session.expiresAt <= new Date() ||
      !this.safeHashEquals(session.refreshTokenHash, dto.refreshToken)
    ) {
      throw new UnauthorizedException('Refresh session is invalid or expired');
    }

    const next = await this.buildTokenPair(session.user.id, session.user.email);

    await this.prisma.$transaction([
      this.prisma.authSession.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      }),
      this.prisma.authSession.create({
        data: {
          id: next.sessionId,
          userId: session.user.id,
          refreshTokenHash: this.hashRefreshToken(next.refreshToken),
          expiresAt: next.refreshExpiresAt,
        },
      }),
    ]);

    return this.formatAuthResponse(
      session.user.id,
      session.user.email,
      next.accessToken,
      next.refreshToken,
    );
  }

  async logout(dto: RefreshTokenDto) {
    const tokenHash = this.hashRefreshToken(dto.refreshToken);

    await this.prisma.authSession.updateMany({
      where: {
        refreshTokenHash: tokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return { success: true };
  }

  private async createSession(userId: string, email: string) {
    const tokens = await this.buildTokenPair(userId, email);

    await this.prisma.authSession.create({
      data: {
        id: tokens.sessionId,
        userId,
        refreshTokenHash: this.hashRefreshToken(tokens.refreshToken),
        expiresAt: tokens.refreshExpiresAt,
      },
    });

    return this.formatAuthResponse(
      userId,
      email,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }

  private async buildTokenPair(userId: string, email: string) {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT secrets are not configured');
    }

    const sessionId = randomUUID();
    const accessPayload: AccessTokenPayload = {
      sub: userId,
      email,
      type: 'access',
    };
    const refreshPayload: RefreshTokenPayload = {
      sub: userId,
      sid: sessionId,
      type: 'refresh',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: accessSecret,
        expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: refreshSecret,
        expiresIn: REFRESH_TOKEN_TTL_SECONDS,
      }),
    ]);

    return {
      sessionId,
      accessToken,
      refreshToken,
      refreshExpiresAt: new Date(
        Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000,
      ),
    };
  }

  private async verifyRefreshToken(token: string) {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }

    try {
      const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        token,
        { secret: refreshSecret },
      );

      if (payload.type !== 'refresh' || !payload.sub || !payload.sid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private hashRefreshToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private safeHashEquals(expectedHash: string, token: string) {
    const actualHash = this.hashRefreshToken(token);
    const expected = Buffer.from(expectedHash, 'hex');
    const actual = Buffer.from(actualHash, 'hex');

    return expected.length === actual.length && timingSafeEqual(expected, actual);
  }

  private formatAuthResponse(
    id: string,
    email: string,
    accessToken: string,
    refreshToken: string,
  ) {
    return {
      user: { id, email },
      accessToken,
      refreshToken,
      accessTokenExpiresIn: ACCESS_TOKEN_TTL_SECONDS,
    };
  }
}
