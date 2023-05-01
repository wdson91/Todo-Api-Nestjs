/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
export class UpdateUserDto {
  @ApiProperty({
    example: 'Completed',
  })
  @IsNotEmpty()
  status: TodoStatus;
}

