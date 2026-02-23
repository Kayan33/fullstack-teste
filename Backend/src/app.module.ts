import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';
import { AuthenticationModule } from './modules/Authentication/Authentication.module';
import { UserModule } from './modules/User/User.module';
import { TasksModule } from './modules/Tasks/Tasks.module';

@Module({
imports: [PrismaModule,UserModule,AuthenticationModule, TasksModule]
})
export class AppModule {}
