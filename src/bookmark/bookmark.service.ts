import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookmarkDto } from "./dtos/bookmark.dto";

@Injectable({})
export class BookmarkService{
    constructor(private dbService: PrismaService){}
    
    async getUserBookmarks(user: User){
        try { 
            return await this.dbService.bookmark.findMany({
                where:{
                    user: user
                }
            });
        } catch (error) { }
    }

    async create(dto: CreateBookmarkDto):Promise<number>{
        try {
            const newBookmark = await this.dbService.bookmark.create({ data:{
                title: dto.title,
                description: dto.description,
                link: dto.link,
                userId: dto.userId}});

            return newBookmark.id;

        } catch (error) { return -1;}    
    }

    async delete(bookmarkId: number): Promise<boolean> {
  try {
    const bookmark = await this.dbService.bookmark.findUnique({
      where: {
        id: bookmarkId, 
      },
    });

    if (!bookmark) return false;

    await this.dbService.bookmark.delete({
      where: {
        id: bookmark.id, 
      },
    });

    return true;
  } catch (error) {
    console.error('///////////////');
    console.error(error);
    return false;
  }
}

}