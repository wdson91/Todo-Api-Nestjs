import { TodoEntity } from 'src/Entity/todo.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()   
    id: number

    @Column()
    name:string

    @Column()
    email:string
    @Column()
    password:string
    @Column()
    salt:string
    
    @OneToMany(type => TodoEntity, todo => todo.user )
    todos: TodoEntity[]
}