import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common'; 
import { UserService } from './user.service'; 
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/getuser.decorator';
import { User } from 'generated/prisma';
import { UpdateUserDto } from './dtos/user.dto';
 
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userservice: UserService){} 
    @Get('data')
    async GetData(@GetUser() user:User){
        const { password, ...rest } = user;
        return user !== null ? {user: rest} : "user was not found";
    }

    @Put('')
    async UpdateUser(@GetUser() user:User, @Body() dto:UpdateUserDto){
        const result = await this.userservice.update(dto, user.id);
        return result ? "Success" : "Failed";
    } 

    @Delete('')
    async DeleteUser(@Body() id:number){
        const result = await this.userservice.delete(id);
        return result ? "Success" : "Failed";
    }  
} 
