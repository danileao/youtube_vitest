
import crypto from "crypto"
import { AppError } from "../../error/app.error";

export type User = {
    id?: string,
    name: string,
    username: string
}

export class UserService {

    users: User[] = []


    async create(user: User) {
        const existUser = this.users.find(u => u.username === user.username);
        console.log({ existUser })
        if (existUser) throw new AppError("User already exists", 400)

        user.id = crypto.randomUUID();

        this.users.push(user)
        return user;
    }

    findAll() {
        return this.users;
    }
}