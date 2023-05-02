/* eslint-disable prettier/prettier */
import { UpdateUserDto } from './../DTO/updateTodoDto';

import { User } from './../auth/user.decorator';

import { CreateTodoDto } from './../DTO/createTodoDto';

import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Delete, Param, Patch, UseGuards } from '@nestjs/common/decorators';
;
import { AuthGuard } from '@nestjs/passport';

import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
//import { TodoStatus2 } from '@prisma/client';

@ApiTags('To-dos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: "Get all user 'todos'" })
  getAllTodos(@User() user: any) {
    return this.todoService.getAllTodos(user);
  }

  @Post('create')
  @ApiOperation({ summary: "Create a 'todo'" })
  createNewTodo(@Body() title: CreateTodoDto, @User() description: any) {
    return this.todoService.createNewTodo(title, description);
  }

  @Patch(':id')
  //@ApiOperation({summary:"Update a todo ,   Example: '{"status":"Completed"}' " })
  @ApiBody({ type: UpdateUserDto })
  updateTodo(
    @Body('status') status: any,
    @Param('id') id: number,
    @User() user: any,
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  deleteTodo(@Param('id') id: number, @User() user: any) {
    return this.todoService.delete(id, user);
  }
}
