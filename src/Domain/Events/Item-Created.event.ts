import { IEvent } from "@nestjs/cqrs";
import { ItemProperties } from "../Aggregates/ItemAggregate/Item";

export class ItemCreatedEvent implements IEvent, ItemProperties {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
    readonly imageUrl: string;
}