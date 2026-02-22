import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import { UserService } from "./user.service";

@Controller('User')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    Create(@Body() dtos: CreateUserDto) {
        return this.userService.create(dtos);
    }

}