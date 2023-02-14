import { TodoStatus } from 'src/Entity/todo.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto{
    @ApiProperty({
        example: 'Completed'
        
      })
    @IsNotEmpty()
    status:TodoStatus
    
}