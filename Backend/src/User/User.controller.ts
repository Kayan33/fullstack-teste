import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./Dtos/UpdateUserDto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários' })
    FindAll() {
        return this.userService.getAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    FindOne(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    Create(@Body() dtos: CreateUserDto) {
        return this.userService.create(dtos);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Atualiza um usuário existente' })
    Update(@Body() dtos: UpdateUserDto, @Param('id') id: string) {
        return this.userService.update(id, dtos);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Deleta um usuário existente' })
    Delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}