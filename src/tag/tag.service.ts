import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dtos/tag.dto';
import { Tag } from 'generated/prisma';

@Injectable()
export class TagService {
    constructor(private dbService: PrismaService){}

    async getAllUserTags(userid: number):Promise<Tag[]>{
        try {
            return await this.dbService.tag.findMany({
                    where:{
                        userId: userid
                    }
            });
        } catch (error) {
            return [];
        }
    }
      
    async createTag( dto: CreateTagDto):Promise<boolean>{
        try {
            await this.dbService.tag.create({
                data:{
                    name: dto.name,
                    userId: dto.userId, 
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 

    async renameTag(name:string, id:number ):Promise<boolean>{
        try {
            await this.dbService.tag.update({
                where:{
                    id
                },
                data:{
                    name: name
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 
    
    async deleteTag(id: number):Promise<boolean>{
        try {
            await this.dbService.tag.delete({
                where:{
                    id: id
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 
}
