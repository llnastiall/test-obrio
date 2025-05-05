import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IUser} from "@common/lib/interfaces";

@Entity({ name: 'users' })
export class UserEntity implements IUser{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', nullable: true })
    name: string

    @Column({ name: 'password', nullable: true })
    password: string

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date

    @DeleteDateColumn({ name: 'delete_at', nullable: true })
    public deletedAt?: Date
}
