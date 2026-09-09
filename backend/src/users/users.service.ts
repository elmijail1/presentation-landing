import { Injectable } from '@nestjs/common';
import { MUser } from './models/user.model.js';
import { generateGuestName } from './guest-name.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(): Promise<MUser> {
    return this.prisma.user.create({
      data: { name: generateGuestName() },
    });
  }

  findById(id: string): Promise<MUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOrCreate(userId?: string): Promise<MUser> {
    if (userId) {
      const existing = await this.findById(userId);
      if (existing) return existing;
      console.warn(
        `No user found with the id ${userId} – creating a new guest user instead.`,
      );
    }
    return this.create();
  }
}
