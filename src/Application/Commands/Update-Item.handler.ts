import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { Item } from 'src/Domain/Aggregates/ItemAggregate/Item';
import { ItemRepository } from 'src/Domain/Aggregates/ItemAggregate/Item.repository';
import { UpdateItemCommand } from './Update-Item.command';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
    constructor(
        @Inject('ItemRepositoryImplement')
        private readonly itemRepository: ItemRepository,
    ) {}

    async execute(command: UpdateItemCommand): Promise<any> {

        const item = await this.itemRepository.findById(command.id);
        if (!item) {
            throw new InternalServerErrorException('Item does not exists on the database');
        }

        item.edit(command.name, command.quantity, command.price, command.imageUrl);
        
        await this.itemRepository.save(item);

        return item;
    }
}