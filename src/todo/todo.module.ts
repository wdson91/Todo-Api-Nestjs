/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
