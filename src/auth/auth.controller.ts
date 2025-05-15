import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service"; 
import { AddUserDto, AuthDto } from "./dtos/auth.dto";

@Controller('auth')
export class AuthController{
    constructor(private authservice:AuthService){}
    @Post('signup') 
    async signup(@Body() body:AddUserDto){
        const result = await this.authservice.signup(body);
        console.log(result)
        return result > 0 ? {messge: 'Success', userId: result } : "Failed";
    }

    @Post('login')
    async login(@Body() body:AuthDto){
        const token = await this.authservice.login(body);
        return token !== null ? {messge: 'Success', token } : "Failed";
    }
}