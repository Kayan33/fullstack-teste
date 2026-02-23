import { ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";

export const handlePrismaError = (error: any) => {
  switch (error.code) {
    case 'P2002':
      throw new ConflictException('Registro já existe.');
    case 'P2003':
      throw new BadRequestException('Chave estrangeira não existe.');
    case 'P2025':
      throw new NotFoundException('Registro não encontrado no banco de dados.');
    default:
      console.error(error);
      throw new InternalServerErrorException('Erro interno no servidor.');
  }
};