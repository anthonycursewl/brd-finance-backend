import { Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

// body 
import { Body } from "@nestjs/common";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('/send/email')
    async sendEmail(@Body('email') email: string) {
        return await this.mailService.sendWelcomeEmail(email)
    }
}