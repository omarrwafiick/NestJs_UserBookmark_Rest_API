import { Injectable } from '@nestjs/common';
import { SharedBookmark } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSharedDto } from './dtos/shared.dto';

@Injectable()
export class SharedService {
    constructor(private dbService: PrismaService){}

    async getAllShared(userid: number):Promise<SharedBookmark[]>{
            try {
                return await this.dbService.sharedBookmark.findMany({
                    where:{
                        sharedWithId: userid,
                        permissions: 'read'
                    },
                    include: {
                        bookmark: true,  
                    },
                });
            } catch (error) {
                return [];
            }
    }
      
    async createShare( dto: CreateSharedDto):Promise<boolean>{
        try {
            await this.dbService.sharedBookmark.create({
                data:{
                    bookmarkId: dto.bookmarkId,
                    sharedWithId: dto.sharedWithId,
                    permissions: dto.permissions
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 
    
    async deleteShare(id: number):Promise<boolean>{
        return this.dbService.deleteById('sharedBookmark', id);
    }       
}
