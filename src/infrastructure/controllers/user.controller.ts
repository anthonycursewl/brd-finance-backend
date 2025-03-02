import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/application/services/user.service";
import { User } from "src/domain/models/user.model";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async register(@Body() user: User) {
        return this.userService.save(user);
    }

    @Post('/login')
    async login(@Body() user: User) {
        return this.userService.authenticate(user);
    }

    @Get('/verify')
    async verify(@Req() req: Request) {
        return this.userService.verifyTokens(req.headers.authorization, 'access');
    }

    @Get('/verify/refresh')
    async verifyRefresh(@Req() req: Request) {
        return this.userService.verifyTokens(req.headers.authorization, 'refresh');
    }
}