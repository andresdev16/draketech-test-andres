import { ICommand } from "@nestjs/cqrs";

export class UpdateItemCommand implements ICommand {
    constructor(
       readonly id: string,
       readonly name: string,
       readonly quantity: number,
       readonly price: number,
       readonly imageUrl: string, 
    ) {}
}