import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
        },
        select: this.publicUserSelect,
      });
    } catch (error) {
      this.rethrowUniqueEmail(error);
    }
  }

  async createWithPassword(email: string, passwordHash: string) {
    try {
      return await this.prisma.user.create({
        data: {
          email,
          passwordHash,
        },
        select: this.publicUserSelect,
      });
    } catch (error) {
      this.rethrowUniqueEmail(error);
    }
  }

  async findByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: this.publicUserSelect,
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.publicUserSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findPublicById(id: string) {
    return this.findOne(id);
  }

  private readonly publicUserSelect = {
    id: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  private rethrowUniqueEmail(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('A user with this email already exists');
    }

    throw error;
  }
}
