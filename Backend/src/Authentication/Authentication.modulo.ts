import { Module } from '@nestjs/common';
import { AuthenticationController } from './Authentication.controller';
import { AuthenticationService } from './Authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule { }