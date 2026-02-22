import { ConflictException, NotFoundException, InternalServerErrorException } from "@nestjs/common";

export const handlePrismaError = (error: any) => {
  switch (error.code) {
    case 'P2002':
      throw new ConflictException('Conflito: Este registro já existe (campo duplicado).');
    case 'P2025':
      throw new NotFoundException('Registro não encontrado no banco de dados.');
    default:
      console.error(error);
      throw new InternalServerErrorException('Erro interno no servidor.');
  }
};