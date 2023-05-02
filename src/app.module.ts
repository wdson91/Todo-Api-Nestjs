import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'todo-front'),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule.forRoot(),
    TodoModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
