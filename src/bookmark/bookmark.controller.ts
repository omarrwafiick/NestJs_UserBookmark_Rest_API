import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { BookmarkService } from "./bookmark.service";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkservice: BookmarkService){}
    @Get()
    async create(@GetUser() user:User){
        return this.bookmarkservice.userBookmarks(user);
    }
}