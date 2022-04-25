import { ICommand } from '@nestjs/cqrs';

export class DeleteItemCommand implements ICommand {
    constructor(
        readonly id: string
    ) {}
}