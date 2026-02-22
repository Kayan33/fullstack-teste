import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/Database/Prisma.service";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import * as bcrypt from 'bcrypt';
import { Prisma } from "generated/prisma";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {

            const user = await this.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
                select: { id: true, name: true, email: true }
            });
            return { message: 'Usuário criado com sucesso', user };
        } catch (error) {
            if (error?.code === 'P2002') {
                throw new ConflictException('Este e-mail já está cadastrado.');
            }

            throw new InternalServerErrorException('Erro inesperado ao criar usuário.');
        }

    }


}