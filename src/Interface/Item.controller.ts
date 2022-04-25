import {Body, Controller, Get, Param, Post, Request, UseGuards, Query, Delete, Put} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/Interface/Services/Jwt-Auth.guard';

import { CreateItemDTO } from 'src/Interface/DTOs/CreateItem.dto';
import { CreateItemCommand } from 'src/Application/Commands/Create-Item.command';

import { Roles } from './Services/Roles.decorator';
import { PartyRoles } from 'src/Domain/Aggregates/UserAggregate/PartyRole';
import { GetItemsQueryDTO } from './DTOs/GetItemsQuery.dto';
import { GetAllItemsQuery } from 'src/Application/Queries/Get-Items.query';
import { GetItemQueryParamDTO } from './DTOs/GetItemQuery.param.dto';
import { GetItemQuery } from 'src/Application/Queries/Get-Item.query';
import { DeleteItemDTO } from './DTOs/DeleteItem.dto';
import { DeleteItemCommand } from 'src/Application/Commands/Delete-Item.command';
import { UpdateItemDTO } from './DTOs/UpdateItem.dto';
import { UpdateItemCommand } from 'src/Application/Commands/Update-Item.command';

@ApiTags('Products')
@Controller('products')
export class ItemController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('create')
    async createAsync(@Request() request: any, @Body() body: CreateItemDTO): Promise<void>{
        const command = new CreateItemCommand(body.name, body.quantity, body.price, body.imageUrl)
        await this.commandBus.execute(command)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('all')
    async getAll(@Request() request: any, @Query() queryDto: GetItemsQueryDTO): Promise<any> {
        const query = new GetAllItemsQuery(queryDto.offset, queryDto.limit);
        return { products: await this.queryBus.execute(query) };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:id')
    async getItem(@Param() param: GetItemQueryParamDTO): Promise<any> {
        const query = new GetItemQuery(param.id);
        return this.queryBus.execute(query);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    async deleteItem(@Param() param: DeleteItemDTO): Promise<void> {
        const command = new DeleteItemCommand(param.id);
        return this.commandBus.execute(command);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('update')
    async updateItem(@Body() body: UpdateItemDTO): Promise<any> {
        const command = new UpdateItemCommand(body.id, body.name, body.quantity, body.price, body.imageUrl);
        return await this.commandBus.execute(command);
    }
}