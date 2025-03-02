import { Injectable } from "@nestjs/common";
import { User, UserProfile } from "src/domain/models/user.model";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    async save(user: User): Promise<User | null> {
        return await this.prisma.users.create({ data: user });
    }

    async findByEmail(em: string): Promise<User | null> {
        const user = await this.prisma.users.findUnique({ where: { email: em }})
        return user ? new User(user.id, user.name, user.username, user.email, user.password, user.type, user.created_at, user.bought_at) : null
    }

    findById(id: string): Promise<UserProfile | null> {
        return this.prisma.users.findUnique({ where: { id }, select: { id: true, name: true, username: true, email: true, type: true, created_at: true, bought_at: true }});
    }
}