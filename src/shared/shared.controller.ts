import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SharedService } from "./shared.service";
import { User } from "generated/prisma";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { CreateSharedDto } from "./dtos/shared.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller('shared')
export class SharedController {
    constructor(private sharedservice:SharedService){}

    @Get('')
    async getAllSharedWithUser(@GetUser() user:User){
        const result = await this.sharedservice.getAllShared(user.id);
        return result.length > 0? result : "Nothing is shared with you";
    }
 
    @Post('')
    async create( @Body() dto:CreateSharedDto){
        const result = await this.sharedservice.createShare(dto);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param() id:number){
        const result = await this.sharedservice.deleteShare(id);
        return result ? result : "Failed";
    }
}  