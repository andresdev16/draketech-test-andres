import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class DeleteItemDTO {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ format: 'uuid', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
    id: string;
}