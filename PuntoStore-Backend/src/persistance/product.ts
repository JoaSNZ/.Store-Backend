import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: Number 

    @Column({
        length:100,
    })
    name!: String

    @Column({
        length:100,
    })
    price!: Number

    @Column({
        length:100,
    })
    photo!: String
}

