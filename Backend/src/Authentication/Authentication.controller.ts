import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthenticationService } from "./Authentication.service";
import { ApiOperation } from "@nestjs/swagger";
import { AuthenticationDto } from "./Dtos/AuthenticationDto";

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realiza o login e retorna o token JWT' })
    async login(@Body() data: AuthenticationDto) {
        const user = await this.authenticationService.validateUser(data.email, data.password);

        return this.authenticationService.login(user);
    }
}