import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class UserService{
    constructor(private dbService: PrismaService){}
    async getUser(email:string){
        return await this.dbService.user.findUnique({
            where: {
                email
            }
        })
    }
}