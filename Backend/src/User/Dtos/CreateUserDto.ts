import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example : 'Kayan Pereira'})
  @IsString()
  @IsNotEmpty({ message: 'Nome Não pode ser vazio' })
  name: string;

  @ApiProperty({ example: 'kayan@teste.com' })
  @IsEmail(undefined, { message: 'Email inválido' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(5, { message: "Senha precisa de pelo menos 6 digitos" })
  @IsString()
  @IsNotEmpty()
  password: string;
}