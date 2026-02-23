import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TasksService } from "./Tasks.service";
import { CreateTasksDtos } from "./Dtos/CreateTasksDtos";
import { JwtAuthGuard } from "src/common/Authentication/guards/jwt.guard";
import { ApiOperation } from "@nestjs/swagger";
import { UpdateTasksDtos } from "./Dtos/UpdateTasksDtos";



@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskservice: TasksService) { }

    @Get()
    @ApiOperation({ summary: 'Lista todas as tarefa' })
    FindAll(@Req() req ) {
        const userId = req.user.id
        return this.taskservice.getAll(userId)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Busca uma tarefa pelo id' })
    Get(@Req() req, @Param('id') id: string) {
        const userId = req.user.id;
        return this.taskservice.getById(userId,id)
    }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova tarefa' })
    async create(@Body() data: CreateTasksDtos, @Req() req) {
        const userId = req.user.id;
        return this.taskservice.create(data, userId)
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Atualiza tarefa' })
    async update(@Body() data: UpdateTasksDtos, @Req() req, @Param('id') id: string) {
        const userId = req.user.id
        return this.taskservice.update(id, data, userId)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Deleta tarefa' })
    async delete(@Req() req, @Param('id') id: string) {
        const userId = req.user.id
        return this.taskservice.delete(id,userId)
    }
}