import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Database/Prisma.service";
import { CreateTasksDtos } from "./Dtos/CreateTasksDtos";
import { handlePrismaError } from "src/common/errors/prisma-error.handler";
import { UpdateTasksDtos } from "./Dtos/UpdateTasksDtos";

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly taskSelect = {
        id: true,
        title: true,
        description: true,
        status: true,
        statusTasks: true,
        dateCompleted: true,
        createdAt: true,
        updatedAt: true
    };

    async getAll(userId: string) {
        return await this.prisma.tasks.findMany({
            where: { userId, status: 'ACTIVE' },
            select: this.taskSelect
        })
    }

    async getById(userId: string, id: string) {
        const task = await this.prisma.tasks.findFirst({
            where: { userId, id, status: 'ACTIVE' },
            select: this.taskSelect
        })
        if (!task) {
            throw new NotFoundException('Tarefa não encontrada');
        }
        return task
    }

    async create(data: CreateTasksDtos, userId: string) {
        try {
            const tasks = await this.prisma.tasks.create({
                data: {
                    ...data,
                    userId: userId
                },
            });
            return { message: 'Cadastrado tarefa!', tasks };
        } catch (error) {
            return handlePrismaError(error);
        }
    }

    async update(id: string, data: UpdateTasksDtos, userId: string) {
        try {
            const updateDataObjt: any = { ...data };

            if (data.statusTasks === 'COMPLETE') {
                updateDataObjt.dateCompleted = new Date();
            } else if (data.statusTasks === 'PENDING' || data.statusTasks === 'IN_PROGRESS') {
                updateDataObjt.dateCompleted = null;
            }

            await this.prisma.tasks.update({
                where: { id, userId, status: 'ACTIVE' },
                data: updateDataObjt
            });
            return { message: 'Tarefa atualizada com sucesso' };
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async delete(id: string, userId: string) {
        try {
            await this.prisma.tasks.update({
                where: { id, userId, status: 'ACTIVE' },
                data: { status: 'INACTIVE' }
            })

            return { message: 'Task deletada com secesso' }
        } catch (error) {
            return handlePrismaError(error);
        }
    }
}