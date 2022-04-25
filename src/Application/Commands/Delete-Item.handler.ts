import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateItemCommand } from './Create-Item.command';

import { Item } from 'src/Domain/Aggregates/ItemAggregate/Item';
import { ItemRepository } from 'src/Domain/Aggregates/ItemAggregate/Item.repository';
import { DeleteItemCommand } from './Delete-Item.command';

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
    constructor(
        @Inject('ItemRepositoryImplement')
        private readonly itemRepository: ItemRepository,
        private readonly eventPublisher: EventPublisher
    ) {}

    async execute(command: DeleteItemCommand): Promise<any> {
        
        await this.itemRepository.delete(command.id);
        Logger.log('Deleted item @{id}', command.id);
    }
}