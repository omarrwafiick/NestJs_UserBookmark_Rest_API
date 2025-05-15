import { Injectable } from '@nestjs/common';
import { Visit } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitService {
    constructor(private dbService: PrismaService){}

    async getByBookmarkId(bookmarkid: number):Promise<Visit[]>{
            try {
                return await this.dbService.visit.findMany({
                        where:{
                            bookmarkId: bookmarkid
                        }
                });
            } catch (error) {
                return [];
            }
    }
    
    async getAllUserVisits(userid: number):Promise<Visit[]>{
            try {
                return await this.dbService.visit.findMany({
                    where: {
                        bookmark: {
                        userId: userid,  
                        },
                    },
                    include: {
                        bookmark: true,  
                    },
                    });
            } catch (error) {
                return [];
            }
    }

    async createVisit( bookmarkId: number):Promise<boolean>{
        try {
            await this.dbService.visit.create({
                data:{
                    bookmarkId: bookmarkId
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 
    
}
 