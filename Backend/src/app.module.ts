import { Module } from '@nestjs/common';
import { UserModule } from './User/User.modulo';
import { PrismaModule } from './Database/prisma.module';
import { AuthenticationModule } from './modules/Authentication/Authentication.module';

@Module({
imports: [PrismaModule,UserModule,AuthenticationModule]
})
export class AppModule {}
