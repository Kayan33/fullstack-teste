import { Module } from '@nestjs/common';
import { UserModule } from './User/User.modulo';
import { PrismaModule } from './Database/prisma.module';
import { AuthenticationModule } from './Authentication/Authentication.modulo';

@Module({
imports: [PrismaModule,UserModule,AuthenticationModule]
})
export class AppModule {}
