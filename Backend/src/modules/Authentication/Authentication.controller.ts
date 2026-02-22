import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import type { Response } from 'express';
import { AuthenticationService } from "src/modules/Authentication/Authentication.service";
import { AuthenticationDto } from "src/modules/Authentication/Dtos/AuthenticationDto";

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    private readonly COOKIE_OPTIONS = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax' as const,
        maxAge: 3600000,
    };

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: AuthenticationDto, @Res({ passthrough: true }) response: Response) {
        const user = await this.authenticationService.validateUser(data.email, data.password);
        const { access_token, user: userData } = await this.authenticationService.login(user);

        response.cookie('access_token', access_token, this.COOKIE_OPTIONS);

        return { message: 'Login efetuado com sucesso', user: userData };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token', {
            httpOnly: this.COOKIE_OPTIONS.httpOnly,
            secure: this.COOKIE_OPTIONS.secure,
            sameSite: this.COOKIE_OPTIONS.sameSite,
        });
        return { message: 'Logout efetuado com sucesso' };
    }
}