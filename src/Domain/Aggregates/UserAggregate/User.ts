import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { UserCreatedEvent } from 'src/Domain/Events/User-Created.event';

export interface UserProperties {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;
}

export class User extends AggregateRoot {
    private readonly id: string;
    private email: string;
    private password: string;
    private name: string;
   
    constructor(properties: UserProperties) {
        super()
        this.id = properties.id;
        this.email = properties.email;
        this.password = properties.password;
        this.name = properties.name;
    }

    properties(): UserProperties {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            name: this.name,
        };
    }

    setPassword(password: string): void {
        if (this.password !== '' || password === '') {
            throw new InternalServerErrorException('Password cannot be null');
        }
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, salt);
    }

    comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}