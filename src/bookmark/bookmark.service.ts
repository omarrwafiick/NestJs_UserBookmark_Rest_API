import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class BookmarkService{
    constructor(private dbService: PrismaService){}
    async userBookmarks(user: User){
        return await this.dbService.bookmark.findMany({
            where:{
                user: user
            }
        });
    }
}