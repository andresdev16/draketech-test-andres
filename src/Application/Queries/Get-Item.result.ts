import { IQueryResult } from "@nestjs/cqrs";

export class GetItemResult implements IQueryResult {
    readonly id: string = '';
    readonly name: string = '';
    readonly quantity: number = null;
    readonly price: number = null;
    readonly imageUrl: string = '';
}