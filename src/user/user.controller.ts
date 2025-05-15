import { Controller, Get, Req, UseGuards } from '@nestjs/common'; 
import { UserService } from './user.service'; 
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/getuser.decorator';
import { User } from 'generated/prisma';
 
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userservice: UserService){}
    @Get('data')
    async GetData(@GetUser() user:User){
        const { password, ...rest } = user;
        return user !== null ? {user: rest} : "user is not found";
    }
} 
