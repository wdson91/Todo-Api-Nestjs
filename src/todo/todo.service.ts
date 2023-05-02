/* eslint-disable prettier/prettier */
import { CreateTodoDto } from './../DTO/createTodoDto';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos(user) {
    const todos = await this.prisma.todos.findMany({
      where: { userId: user},
    });

    try {
      return await todos;
    } catch (err) {
      throw new NotFoundException('No todo found');
    }
  }

  async createNewTodo(createTodoDto: CreateTodoDto, user: number) {
    const { title, description } = createTodoDto;
    user = Number(user);
    const data = {
      title,
      description,

      userId: 1,
    }
    try {
      return await this.prisma.todos.create({
        data
    
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong, todo not created',
      );
    }
  }
  async update(id: number, status: any, user: any) {
    id = Number(id);
    const verificar = await this.prisma.todos.findUnique({ where: { id } });
    if (!verificar) {
      throw new InternalServerErrorException('Something went wrong');
    } else {
      if (verificar.userId == user) {
        try {
          await this.prisma.todos.update({
            where: { id: id },
            data: { status: status },
          });

          return await this.prisma.todos.findUnique({ where: { id } });
        } catch (err) {
          throw new InternalServerErrorException('Something went wrong');
        }
      }
    }
    throw new UnauthorizedException('Something went wrong');
  }

  async delete(id: number, user: any) {
    id = Number(id);
    
    const verificar = await this.prisma.todos.findUnique({ where: { id } });
    if (!verificar) {
      throw new InternalServerErrorException('Something went wrong');
    } else if (verificar.userId == user) {
      try {
        await this.prisma.todos.delete({ where: { id } });

        return { success: true };
      } catch (error) {
        throw new InternalServerErrorException('Something went wrong');
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
