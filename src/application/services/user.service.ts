import { UserRepositoryImpl } from "src/infrastructure/persistence/repositories/user.repository.impl";
import { User, UserProfile } from "src/domain/models/user.model";
import { Auth } from "src/domain/models/auth.model";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

// jwt 
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ArgonService } from "src/domain/services/argon.service";

@Injectable()
export class UserService {
    constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepositoryImpl, 
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService,
    private readonly hashService: ArgonService
) {}

    async save(user: User): Promise<User | null> {
        if (!user) throw new UnauthorizedException('BRD | User not found!');
        const isValid: User | null = await this.userRepository.findByEmail(user.email);
        if (isValid !== null) throw new UnauthorizedException('BRD | User already exists!');
        const hash = await this.hashService.hash(user.password);
        user.password = hash;
        return this.userRepository.save(user);
    }

    private generateToken(user: User): Auth {
        const secret_a_t = this.configService.get<string>('JWT_SECRET');
        const secret_r_t = this.configService.get<string>('JWT_SECRET_REFRESH');
        
        const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
        const expiresInRefresh = this.configService.get<string>('JWT_EXPIRES_IN_REFRESH');
        
        const payload = { username: user.username, sub: user.id, email: user.email };
        const token: string = this.jwtService.sign(payload, { secret: secret_a_t, expiresIn: expiresIn });
        const refreshToken: string = this.jwtService.sign(payload, { secret: secret_r_t, expiresIn: expiresInRefresh });
        return new Auth(token, refreshToken);
    }
    
     async verifyTokens(token: string, type: string): Promise<UserProfile | null>  {
        if (!token) throw new UnauthorizedException('BRD | Access token not found!');
        try {
            if (type === 'refresh') {
                const secret_r_t = this.configService.get<string>('JWT_SECRET_REFRESH');
                const payload = this.jwtService.verify(token, { secret: secret_r_t });
                return await this.userRepository.findById(payload.sub);
            }
    
            if (type === 'access') {
                const secret_a_t = this.configService.get<string>('JWT_SECRET');
                const payload = this.jwtService.verify(token, { secret: secret_a_t });
                return await this.userRepository.findById(payload.sub);
            }

            return null
        } catch (error) {
            throw new UnauthorizedException('BRD | Access token not valid!');
        }
    }
     
    // this function will be migrated to Auth service due to separate user's authentication & authorization.
    /*
    @Params user: User
    */
    async authenticate(user: User): Promise<Auth | null> {
        if (!user) throw new UnauthorizedException('BRD | User not found!');
        const isValid = await this.userRepository.findByEmail(user.email);
        if (!isValid) throw new UnauthorizedException('BRD | User not found!');

        const isPasswordValid = await this.hashService.verify(isValid.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('BRD | Password not valid!');
        return this.generateToken(isValid);
    }
}