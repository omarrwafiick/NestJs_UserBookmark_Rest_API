import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddUserDto, AuthDto } from "./dtos/auth.dto";
import * as argon from "argon2"; 
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
 
@Injectable({})
export class AuthService{
    constructor(private dbService: PrismaService, private jwtservice: JwtService, private config: ConfigService){}

    async signup(dto:AddUserDto):Promise<number>{
        try {  
            const hashedPassword = await argon.hash(dto.password);
            const user = await this.dbService.user.create({
                data:{
                    email: dto.email,
                    password: hashedPassword,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            });
            
            return user.id;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002")
                    throw new ForbiddenException('Credentials already taken');
            }
            return -1;
        }
    }

    async login(dto:AuthDto):Promise<string|null>{
        try { 
            const hashedPassword = await argon.hash(dto.password); 
            const user = await this.dbService.user.findUnique({
                where: {
                email: dto.email,
                },
            });
            if(!user){
                throw new ForbiddenException('Wrong credentials');
            }
            const verifyPW = await argon.verify(user.password, dto.password)
            if(!verifyPW){
                throw new ForbiddenException('Wrong credentials');
            }
            const token = await this.signToken(user.id, user.email)
            return token ;
        } catch (error) {
            
        }
        return null;
    }

    private signToken(userid:number, email:string) :Promise<string>{
        const payload = {
            sub: userid,
            email
        };
        const key = this.config.get('JWT_SECRET');
        return this.jwtservice.signAsync(payload, {
            expiresIn: '1h',
            secret:key
        });
    }
}