import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    quantity!: number;

    @Column()
    price!: number;

    @Column()
    imageUrl!: string;

}