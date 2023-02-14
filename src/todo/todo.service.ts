import { UserEntity } from './../Entity/user.entity';
import { User } from './../auth/user.decorator';
import { CreateTodoDto } from './../DTO/createTodoDto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException,NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TodoService {

constructor(@InjectRepository(TodoEntity) private repo :Repository<TodoEntity>){}



async getAllTodos(user){
  const query = await this.repo.createQueryBuilder('todo');

    query.where(`todo.userId = :userId`, {userId: user.id});
  
    try {
      return await query.getMany();
    } catch (err) {
      throw new NotFoundException('No todo found');
    }

}


async createNewTodo(createTodoDto:CreateTodoDto,user:UserEntity){

    const todo = new TodoEntity()
    const {title,description} = createTodoDto

    todo.title = title
    todo.description = description
    todo.status= TodoStatus.OPEN;
    todo.userId = user.id;
    
    this.repo.create(todo)
    try {
        return await this.repo.save(todo)
    } catch (error) {
    throw new InternalServerErrorException('Something went wrong, todo not created');
    }
    
    
}
async update(id: number, status: TodoStatus, user: UserEntity) {

  
   const verificar = await this.repo.findOne({where:{id}})
   
   if(verificar.userId == user.id){
    try {
      await this.repo.update({id, userId: user.id}, {status});
      return this.repo.findOne({where:{id}});
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  
   }throw new UnauthorizedException('Something went wrong');
  
}

async delete(id: number, user: UserEntity) {
  const result = await this.repo.delete({id, userId: user.id});

  if (result.affected === 0) {
    throw new NotFoundException('Todo not deleted');
  } else {
    return { success: true}
  }

}

  }

