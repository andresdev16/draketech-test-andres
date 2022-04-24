import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column()
    role!: string;
}