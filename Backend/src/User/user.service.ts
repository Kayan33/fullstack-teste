import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/Database/Prisma.service";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./Dtos/UpdateUserDto";
import { handlePrismaError } from "src/common/errors/prisma-error.handler";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    private readonly userSelect = {
        id: true,
        name: true,
        email: true,
    };

    async getAll() {
        return this.prisma.user.findMany({
            where: { status: 'ACTIVE' },
            select: this.userSelect,
        });
    }

    async getById(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
                status: 'ACTIVE'
            },
            select: this.userSelect,
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async create(data: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {

            const user = await this.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
                select: this.userSelect,
            });
            return { message: 'Usuário criado com sucesso', user };
        } catch (error) {
            return handlePrismaError(error);
        }

    }

    async update(id: string, data: UpdateUserDto) {

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        try {
            const user = await this.prisma.user.updateMany({
                where: { id, status: 'ACTIVE' },
                data,
            });

            if (user.count === 0) {
                throw new NotFoundException('Usuário não encontrado');
            }
            return { message: 'Usuário atualizado com sucesso', };
        } catch (error) {

            return handlePrismaError(error);
        }
    }

    async delete(id: string) {
        try {
            const user = await this.prisma.user.updateMany({
                where: { id, status: 'ACTIVE' },
                data: { status: 'INACTIVE' },
            });

            if (user.count === 0) {
                throw new NotFoundException('Usuário não encontrado');
            }

            return { message: 'Usuário deletado com sucesso' };
        } catch (error) {
            return handlePrismaError(error);
        }
    }
}