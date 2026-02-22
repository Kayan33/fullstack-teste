import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthenticationDto {
    @IsEmail(undefined, { message: "email é inválido" })
    @ApiProperty({ example: 'kayan@teste.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @MinLength(5, { message: "Senha precisa de pelo menos 6 digitos" })
    @IsString()
    @IsNotEmpty()
    password: string;
}