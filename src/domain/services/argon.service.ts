import { Injectable } from "@nestjs/common";
import * as Argon2 from 'argon2'

@Injectable()
export class ArgonService {
    constructor() {}

    async hash(password: string): Promise<string> {
        return await Argon2.hash(password, {
            type: Argon2.argon2d,
            hashLength: 14
        })
    }

    async verify(hash: string, password: string): Promise<boolean> {
        return await Argon2.verify(hash, password)        
    }
}