import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, PassportModule } from '@nestjs/passport';

import { LocalStrategy } from 'src/Interface/Strategies/Local.strategy';
import { JwtStrategy } from 'src/Interface/Strategies/Jwt.strategy';
import { AuthService } from 'src/Interface/Services/Auth.service';
import { RolesGuard } from 'src/Interface/Services/Roles.guard';

import { IntegrationEventPublisherImplement } from 'src/infrastructure/message/ItegrationEvent.publisher';
import { UserQueryImplement } from 'src/Infrastructure/Queries/User.query';
import { UserRepositoryImplement } from 'src/Infrastructure/Repositories/User.repository';
import { ItemQueryImplement } from './Infrastructure/Queries/Item.query';
import { ItemRepositoryImplement } from 'src/Infrastructure/Repositories/Item.repository';

import { AuthController } from 'src/Interface/Auth.controller';
import { ItemController } from 'src/Interface/Item.controller';

import { CreateUserCommand } from 'src/Application/Commands/Create-User.command';
import { CreateUserHandler } from 'src/Application/Commands/Create-User.handler';
import { AuthUserCommand } from 'src/Application/Commands/Auth-User.command';
import { AuthUserHandler } from 'src/Application/Commands/Auth-User.handler';
import { GetUserHandler } from 'src/Application/Queries/Get-User.handler';
import { CreateItemCommand } from './Application/Commands/Create-Item.command';
import { CreateItemHandler } from './Application/Commands/Create-Item.handler';
import { GetAllItemsHandler } from './Application/Queries/Get-Items.handler';
import { GetItemHandler } from './Application/Queries/Get-Item.handler';
import { GetItemQuery } from './Application/Queries/Get-Item.query';
import { GetAllItemsQuery } from './Application/Queries/Get-Items.query';
import { GetUserQuery } from './Application/Queries/Get-User.query';

import { UserEntity } from './Infrastructure/Entities/User.entity';
import { ItemEntity } from './Infrastructure/Entities/Item.entity';
import { DeleteItemCommand } from './Application/Commands/Delete-Item.command';
import { UpdateItemCommand } from './Application/Commands/Update-Item.command';

const Infrastructure = [
  IntegrationEventPublisherImplement,
  UserQueryImplement,
  UserRepositoryImplement,
  ItemQueryImplement,
  ItemRepositoryImplement,
  UserEntity,
  ItemEntity,
];

const Application = [
  CreateUserCommand,
  CreateUserHandler,
  AuthUserCommand,
  AuthUserHandler,
  GetUserHandler,
  CreateItemCommand,
  CreateItemHandler,
  GetAllItemsHandler,
  GetItemHandler,
  GetItemQuery,
  GetAllItemsQuery,
  GetUserQuery,
  DeleteItemCommand,
  UpdateItemCommand
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      // secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '3600s'}
    }),
    DDDModule
  ],
  controllers: [
    AuthController,
    ItemController,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
    {
      provide: 'UserRepositoryImplement',
      useClass: UserRepositoryImplement,
    },
    {
      provide: 'UserQueryImplement',
      useClass: UserQueryImplement,
    },
    {
      provide: 'ItemRepositoryImplement',
      useClass: ItemRepositoryImplement,
    },
    {
      provide: 'ItemQueryImplement',
      useClass: ItemQueryImplement,
    },
    Logger,
    ...Infrastructure,
    ...Application,
    AuthService,
    LocalStrategy,
    JwtStrategy, 
    Logger, 
  ],
  exports: [
    AuthService
  ]
})
export class DDDModule {}