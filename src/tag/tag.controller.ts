import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagService } from "./tag.service";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { CreateTagDto } from "./dtos/tag.dto";


@Controller('tag')
export class TagController {
    constructor(private tagservice:TagService){}

    @Get('')
    async getAll(@GetUser() user:User){
        const result = await this.tagservice.getAllUserTags(user.id);
        return result.length > 0? result : "Nothing is shared with you";
    }
 
    @Post('')
    async create(@Body() dto:CreateTagDto){
        const result = await this.tagservice.createTag(dto);
        return result ? result : "Failed";
    }

    @Put(':id')
    async update(@Body() dto:{name:string}, @Param() id:number){
        const result = await this.tagservice.renameTag(dto.name, id);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param() id:number){
        const result = await this.tagservice.deleteTag(id);
        return result ? result : "Failed";
    }
}

 
  