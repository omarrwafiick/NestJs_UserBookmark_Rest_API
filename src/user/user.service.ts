import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dtos/user.dto";

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

    async update(dto:UpdateUserDto, id:number):Promise<boolean>{
        try {
            await this.dbService.user.update({
                where:{
                    id: id
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        } 
    }

    async delete(id:number):Promise<boolean>{
        return this.dbService.deleteById('user', id);
    }

}