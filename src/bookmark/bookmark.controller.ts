import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dtos/bookmark.dto";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkservice: BookmarkService){}
    @Get()
    async get(@GetUser() user:User){
        const result = await this.bookmarkservice.getUserBookmarks(user);
        return result !== null ? result : "Failed";
    }

    @Post()
    async create(@Body() dto:CreateBookmarkDto){
        const result = await this.bookmarkservice.create(dto);
        return result > 0 ? result : "Failed";
    }

    @Delete()
    async delete(@Body() body: { id: number }){ 
        const result = await this.bookmarkservice.delete(body.id);
        return result ? result : "Failed";
    }
}