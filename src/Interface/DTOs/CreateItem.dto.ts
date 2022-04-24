import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateItemDTO {
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