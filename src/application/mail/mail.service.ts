import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MustacheAdapter } from '../adapters/mustache.adapter';
import * as path from 'path';
import { templateHtml } from './templates/mail.template';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mustacheAdapter: MustacheAdapter
  
  ) {}

  async sendWelcomeEmail(email: string): Promise<{ message: string }> {
    //const templatePath = path.join(__dirname, 'templates', 'arroz.mustache');	
    //console.log(`RUTA DEL TEMPLATE | ${templatePath}`)
    //const html = this.mustacheAdapter.compile(templatePath, { name })

    const extractedName = email.split('@')[0];
    await this.mailerService.sendMail({
      to: email,
      subject: `Bienvenido a nuestra plataforma | @${extractedName}!`,
      html: templateHtml(extractedName, new Date().getFullYear().toString()),
    });

    return { message: 'Email enviado con éxito!' };
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Restablecer contraseña',
      template: 'password-reset',
      context: {
        token,
      },
    });
  }
}