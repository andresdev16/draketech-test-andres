import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateItemDTO {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ format: 'uuid', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly imageUrl: string;
}