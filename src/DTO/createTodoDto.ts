import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';


export class CreateTodoDto{
    @ApiProperty({
        example: 'Nome da tarefa',
       
      })
    @IsNotEmpty()
    @MaxLength(15, {message: 'Max length is 15 characters.'})

    title: string;
    @ApiProperty({
        example: 'Descrição da tarefa',
        
      })
    @IsNotEmpty()
    description: string
}