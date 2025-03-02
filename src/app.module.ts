import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryImpl } from './infrastructure/persistence/repositories/user.repository.impl';
import { ArgonService } from './domain/services/argon.service';
import { InvoiceController } from './infrastructure/controllers/invoice.controller';
import { InvoiceRepositoryAdapter } from './infrastructure/persistence/repositories/invoice.repository.impl';
import { InvoiceService } from './application/services/invoice.service';
import { MailModule } from './application/mail/mail.module';
import { MailController } from './application/mail/mail.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MailModule],
  controllers: [AppController, UserController, InvoiceController, MailController],
  providers: [
    { 
      provide: 'UserRepository', 
      useClass: UserRepositoryImpl
    },
    InvoiceRepositoryAdapter,
    InvoiceService,
    ArgonService,
    AppService,
    PrismaService, 
    UserService,
    JwtService],
})
export class AppModule {}
