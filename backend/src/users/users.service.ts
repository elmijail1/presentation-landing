import { Injectable } from '@nestjs/common';
import { MUser } from './models/user.model.js';
import { randomUUID } from 'crypto';
import { generateGuestName, usersData } from './users.data.js';

@Injectable()
export class UsersService {
  create(): MUser {
    const user: MUser = {
      id: randomUUID(),
      name: generateGuestName(),
      registeredOn: new Date(),
    };
    usersData.push(user);
    return user;
  }

  findById(id: string): MUser | undefined {
    return usersData.find((user) => user.id === id);
  }

  findOrCreate(userId?: string): MUser {
    if (userId) {
      const existing = this.findById(userId);
      if (existing) return existing;
      console.warn(
        `No user found with the id ${userId} – creating a new guest user instead.`,
      );
    }
    return this.create();
  }
}
