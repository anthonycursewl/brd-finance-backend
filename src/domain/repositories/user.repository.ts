import { User, UserProfile } from "../models/user.model";

export interface UserRepository {
    save(user: User): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<UserProfile | null>
}