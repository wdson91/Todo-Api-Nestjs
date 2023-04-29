/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty({
    example: 'Completed',
  })
  @IsNotEmpty()
  status: TodoStatus;
}

export enum TodoStatus {
  OPEN,
  WIP,
  COMPLETED,
}
