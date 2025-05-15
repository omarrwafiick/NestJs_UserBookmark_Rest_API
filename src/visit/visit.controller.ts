import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VisitService } from './visit.service';
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { User } from "generated/prisma";

@Controller('visit')
export class VisitController {
    constructor(private visitservice:VisitService){}

    @Get(':bookmarkid')
    async getByBookmarkId(@Param() bookmarkid:number){
        const result = await this.visitservice.getByBookmarkId(bookmarkid);
        return result.length > 0? result : "Nothing is shared with you";
    }

    @Get('')
    async getAll(@GetUser() user:User){
        const result = await this.visitservice.getAllUserVisits(user.id);
        return result.length > 0? result : "Nothing is shared with you";
    }
 
    @Post('')
    async create(@Body() dto:{bookmarkId:number}){
        const result = await this.visitservice.createVisit(dto.bookmarkId);
        return result ? result : "Failed";
    }
 
}
  