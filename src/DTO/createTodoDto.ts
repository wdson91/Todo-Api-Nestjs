/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Nome da tarefa',
  })
  @IsNotEmpty()
  @MaxLength(15, { message: 'Max length is 15 characters.' })
  title: string;
  status:TodoStatus;
  @ApiProperty({
    example: 'Descrição da tarefa',
  })
  @IsNotEmpty()
  description: string;
}
