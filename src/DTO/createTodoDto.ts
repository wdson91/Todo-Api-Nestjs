import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';


export class CreateTodoDto{
    @ApiProperty({
        example: 'Limpar a casa',
        description: `Registrar o nome de  algo pendente a fazer`,
      })
    @IsNotEmpty()
    @MaxLength(15, {message: 'Max length is 15 characters.'})

    title: string;
    @ApiProperty({
        example: 'Limpar a casa até o meio dia',
        description: `Descrição de  algo pendente a fazer`,
      })
    @IsNotEmpty()
    description: string
}