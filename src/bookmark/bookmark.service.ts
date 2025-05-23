import { Injectable } from "@nestjs/common";
import { Bookmark, User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookmarkDto, UpdateBookmarkDto } from "./dtos/bookmark.dto";

@Injectable({})
export class BookmarkService{
    constructor(private dbService: PrismaService){}
    
    async getUserBookmarks(user: User):Promise<Bookmark[]>{
        try { 
            return await this.dbService.bookmark.findMany({
                where:{
                    user: user
                }
            });
        } catch (error) { return []}
    }

    async getById(id:number):Promise<Bookmark | null>{
        try { 
          console.log(id)
          var result = await this.dbService.bookmark.findUnique({
            where:{
              id
            }
           }) 
            return result;
        } catch (error) { 
          return null;
        }
    }

    async search(tagId:number):Promise<Bookmark[]>{
        try { 
            return await this.dbService.bookmark.findMany({
              where:{
                tags: {
                  some:{
                    id: tagId
                  }
                }
              }
           })
        } catch (error) { 
          return [];
        }
    }

    async update(dto:UpdateBookmarkDto ,id:number):Promise<boolean>{
        try { 
           await this.dbService.bookmark.update({
              where:{
                id: id
              },
              data:{
                title: dto.title,
                description: dto.description,
                favicon: dto.favicon,
                link: dto.link
              }
           });
           return true;
        } catch (error) {
          return false;
         }
    }
    
    async create(dto: CreateBookmarkDto):Promise<number>{
        try {
            const exists = await this.dbService.bookmark.findFirst({
              where:{
                link: dto.link
              }
            });
            if(exists) return -1;
            const newBookmark = await this.dbService.bookmark.create({ data:{
                title: dto.title,
                description: dto.description,
                link: dto.link,
                favicon: dto.favicon,
                userId: dto.userId}});

            return newBookmark.id;

        } catch (error) { return -1;}    
    }

    async delete(bookmarkId: number): Promise<boolean> {
       return this.dbService.deleteById('bookmark', bookmarkId);
    }

}