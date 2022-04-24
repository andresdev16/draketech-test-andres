import { IQuery } from "@nestjs/cqrs";

export class GetAllItemsQuery implements IQuery {
    constructor(readonly offset: number, readonly limit: number) {}
}