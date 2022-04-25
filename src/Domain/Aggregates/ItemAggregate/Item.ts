import { AggregateRoot } from '@nestjs/cqrs';

export interface ItemProperties {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
    readonly imageUrl: string;
}

export class Item extends AggregateRoot {
    private readonly id: string;
    private name: string;
    private quantity: number;
    private price: number;
    private imageUrl: string;

    constructor(properties: ItemProperties) {
        super()
        this.id = properties.id;
        this.name = properties.name;
        this.quantity = properties.quantity;
        this.price = properties.price;
        this.imageUrl = properties.imageUrl;
    }

    properties(): ItemProperties {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            imageUrl: this.imageUrl,
        };
    }

    rename(name: string): void {
        this.name = name;
    }

    edit(name: string, quantity: number, price: number, imageUrl: string): void {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.imageUrl = imageUrl
    }
}