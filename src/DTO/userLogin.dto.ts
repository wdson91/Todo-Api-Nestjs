/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UserLoginDto {
  @ApiProperty({
    example: '123456@gmail.com',
    description: `Email cadastrado no registro`,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Abc@123',
    description: `Senha de registro`,
  })
  @IsNotEmpty()
  password: string;
}
