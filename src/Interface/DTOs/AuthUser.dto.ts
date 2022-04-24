import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserBodyDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'example@example.com'})
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}