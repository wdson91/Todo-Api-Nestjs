import { User } from './../auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatus } from './../Entity/todo.entity';
import { TodoStatusValidationPipe } from './../pipes/TodoStatusValidation.pipes';
import { CreateTodoDto } from './../DTO/createTodoDto';

import { Controller, Get, Post,Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Delete, Param, Patch, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiTags, ApiProperty, ApiOperation, ApiBearerAuth, DocumentBuilder } from '@nestjs/swagger';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

constructor(private todoService:TodoService){}


  @Get()
  @ApiOperation({summary:"ovo"})
  getAllTodos( @User() user: UserEntity){ 
    
    return this.todoService.getAllTodos(user)
  }

  
  @Post('create')
  
  createNewTodo(@Body(ValidationPipe) data:CreateTodoDto ,@User() user:UserEntity){
    const options = new DocumentBuilder().addBearerAuth();

    return this.todoService.createNewTodo(data,user)

  }
  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,@User() user:UserEntity
  ) {
      return this.todoService.update(id, status,user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number,@User() user:UserEntity) {
    return this.todoService.delete(id,user);
  }
}
