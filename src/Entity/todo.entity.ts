/* eslint-disable prettier/prettier */

import { UserEntity } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '@prisma/client';


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

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;

  @Column()
  userId: number;
}


