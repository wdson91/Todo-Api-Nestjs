/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from 'src/DTO/updateTodoDto';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TodoStatus;

  @ManyToOne((type) => UserEntity, (user) => user.todos)
  user: UserEntity;

  @Column()
  userId: number;
}


