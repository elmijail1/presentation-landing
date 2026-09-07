import { Injectable } from "@nestjs/common";
import { MUser } from "./models/user.model.js";
import { randomUUID } from "crypto";
import { generateGuestName, usersData } from "./users.data.js";

@Injectable()
export class UsersService {
    create(): MUser {
        const user: MUser = {
            id: randomUUID(),
            name: generateGuestName(),
            registeredOn: new Date()
        }
        usersData.push(user)
        return user
    }

    findById(id: string): MUser | undefined {
        return usersData.find((user) => user.id === id)
    }
}