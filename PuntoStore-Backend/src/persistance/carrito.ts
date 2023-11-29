import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cart!: string;

    constructor(cart: string) {
        this.cart = cart;
    }
}