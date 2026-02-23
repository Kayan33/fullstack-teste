import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./Dtos/UpdateUserDto";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/Authentication/guards/jwt.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @UseGuards(JwtAuthGuard)
    FindAll() {
        return this.userService.getAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    Update(@Body() dtos: UpdateUserDto, @Param('id') id: string) {
        return this.userService.update(id, dtos);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Deleta um usuário existente' })
    @UseGuards(JwtAuthGuard)
    Delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}