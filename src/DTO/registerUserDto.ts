/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegsiterUserDto {
  @ApiProperty({
    example: 'Wdson Danrlei',
    description: `Nome do usuário para o cadastro`,
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: '123456@gmail.com',
    description: `Email de cadastro que será usado como login`,
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'Abc@123',
    description: `Senha com no mínimo 6 caracateres e requer letra maiúscula,numeros`,
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak, choose a stronger password between 6 and 12 characters',
  })
  password: string;
}
