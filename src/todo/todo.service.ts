import { UserEntity } from './../Entity/user.entity';
import { CreateTodoDto } from './../DTO/createTodoDto';
import { TodoEntity } from 'src/Entity/todo.entity';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
    private prisma: PrismaService,
  ) {}

  async getAllTodos(user) {
    const todos = await this.prisma.todos.findMany({
      where: { userId: user.id },
    });

    try {
      return await todos;
    } catch (err) {
      throw new NotFoundException('No todo found');
    }
  }

  async createNewTodo(createTodoDto: CreateTodoDto, user: UserEntity) {
    const { title, description } = createTodoDto;

    try {
      return await this.prisma.todos.create({
        data: {
          title,
          description,

          userId: user.id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong, todo not created',
      );
    }
  }
  async update(id: number, status: any, user: UserEntity) {
    id = Number(id);
    const verificar = await this.prisma.todos.findUnique({ where: { id } });
    if (!verificar) {
      throw new InternalServerErrorException('Something went wrong');
    } else {
      if (verificar.userId == user.id) {
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

  async delete(id: number, user: UserEntity) {
    id = Number(id);
    const verificar = await this.prisma.todos.findUnique({ where: { id } });
    if (!verificar) {
      throw new InternalServerErrorException('Something went wrong');
    } else if (verificar.userId == user.id) {
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
