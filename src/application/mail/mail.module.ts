import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { join } from 'path';
import Handlebars from 'handlebars';
import { MustacheAdapter } from '../adapters/mustache.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
        host: configService.get<string>('MAIL_HOST'),
        port: configService.get<number>('MAIL_PORT'),
        secure: false,
        ignoreTLS: false,
        requireTLS: true,
        auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
        },
        debug: true,
        tls: {
            rejectUnauthorized: false,
        },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
       //
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, MustacheAdapter],
  exports: [MailService],
})
export class MailModule {}