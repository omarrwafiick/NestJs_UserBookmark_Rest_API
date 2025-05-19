import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto, UpdateBookmarkDto } from "./dtos/bookmark.dto";

@UseGuards(JwtGuard) 
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkservice: BookmarkService){}

    @Get('user-bookmarks')
    async get(@GetUser() user:User){
        const result = await this.bookmarkservice.getUserBookmarks(user);
        return result !== null ? result : "Failed";
    }

    @Get('bytag/:tagId')
    async getBookmarksByTag(@Param('tagId', ParseIntPipe) tagId: number){
        const result = await this.bookmarkservice.search(tagId);
        return result.length > 0 ? result : "Not found";
    }

    @Get(':id')
    async getBookmarkById(@Param('id', ParseIntPipe) id: number){ 
        const result = await this.bookmarkservice.getById(id);
        return result !== null ? result : "Failed";
    }

    @Post()
    async create(@Body() dto:CreateBookmarkDto){
        const result = await this.bookmarkservice.create(dto);
        return result > 0 ? result : "Failed";
    }

    @Put(':id')
    async updateBookmark(@Body() dto:UpdateBookmarkDto ,@Param('id', ParseIntPipe) id: number){
        const result = await this.bookmarkservice.update(dto, id);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){ 
        const result = await this.bookmarkservice.delete(id);
        return result ? result : "Failed";
    } 
}