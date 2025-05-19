import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { CreateTagDto } from "./dtos/tag.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller('tag')
export class TagController {
    constructor(private tagservice:TagService){}

    @Get('') 
    async getAll(@GetUser() user:User){
        const result = await this.tagservice.getAllUserTags(user.id);
        return result.length > 0? result : "Nothing is shared with you";
    }
 
    @Post('')
    async create(@Body() dto:CreateTagDto, @GetUser() user:User){
        const result = await this.tagservice.createTag(dto, user.id);
        return result ? result : "Failed";
    }

    @Put(':id')
    async update(@Body() dto:{name:string}, @Param('id', ParseIntPipe)  id:number){
        const result = await this.tagservice.renameTag(dto.name, id);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)  id:number){
        const result = await this.tagservice.deleteTag(id);
        return result ? result : "Failed";
    }
}

 
  