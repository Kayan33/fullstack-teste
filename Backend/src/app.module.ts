import { Module } from '@nestjs/common';
import { UserModule } from './User/User.modulo';
import { PrismaModule } from './Database/prisma.module';

@Module({
imports: [PrismaModule,UserModule]
})
export class AppModule {}
