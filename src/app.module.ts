import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'todo-front'),
    }),
    ConfigModule.forRoot(),
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DB_host}`,
      port: 5432,
      username: `${process.env.DB_username}`,
      password: `${process.env.DB_password}`,
      database: `${process.env.DB_database}`,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
