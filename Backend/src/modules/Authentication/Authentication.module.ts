import { Module } from '@nestjs/common';
import { AuthenticationController } from './Authentication.controller';
import { AuthenticationService } from './Authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/Authentication/strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule { }