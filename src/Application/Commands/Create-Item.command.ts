import { ICommand } from '@nestjs/cqrs';

export class CreateItemCommand implements ICommand {
    constructor(readonly name: string, readonly quantity: number, readonly price: number, readonly imageUrl: string) {}
}