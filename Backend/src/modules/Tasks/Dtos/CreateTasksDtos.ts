import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTasksDtos {
    @ApiProperty({ example: 'Finalizar teste técnico' })
    @IsString()
    @IsNotEmpty({ message: 'O título é obrigatório' })
    title: string;

    @ApiPropertyOptional({ example: 'Finalizar até terça-feira' })
    @IsString()
    @IsOptional()
    description?: string;
}