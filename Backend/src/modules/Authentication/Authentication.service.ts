import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/Database/Prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string) : Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        
        if (user!= null && user.status === 'ACTIVE' && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;

        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(user: any) {
        const payload = { sub: user.id};
        return {
            message : 'Login efetuado com sucesso',
            user:{
                name : user.name,
                email : user.email
            },
            access_token: this.jwtService.sign(payload),
        };
    }

}