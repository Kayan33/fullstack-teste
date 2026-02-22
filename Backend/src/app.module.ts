import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';
import { AuthenticationModule } from './modules/Authentication/Authentication.module';
import { UserModule } from './modules/User/User.module';

@Module({
imports: [PrismaModule,UserModule,AuthenticationModule]
})
export class AppModule {}
