import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { AccessTokenPayload, AuthUser } from '../types/auth-user.type';

type AuthenticatedRequest = Request & { user?: AuthUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request);

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not configured');
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        secret,
      });

      if (payload.type !== 'access' || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private extractBearerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
