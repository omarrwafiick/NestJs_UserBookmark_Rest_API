import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { FolderService } from "./folder.service";
import { GetUser } from "src/auth/decorator/getuser.decorator";
import { User } from "generated/prisma";
import { CreateFolderDto, UpdateFolderDto } from "./dtos/folder.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller('folder')
export class FolderController {
    constructor(private folderservice:FolderService){}
    @Get('')
    async getAll(@GetUser() user:User){
        const result = await this.folderservice.getAll(user.id);
        return result.length > 0? result : "Failed";
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id:number){
        const result = await this.folderservice.getById(id);
        return result !== null ? result : "Failed";
    }

    @Post('')
    async create(@Body() dto:CreateFolderDto){
        const result = await this.folderservice.createFolder(dto);
        return result ? result : "Failed";
    }

    @Put(':id')
    async update(@Body() dto:UpdateFolderDto, @Param('id', ParseIntPipe) id:number){
        const result = await this.folderservice.updateFolder(dto, id);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        const result = await this.folderservice.deleteFolder(id);
        return result ? result : "Failed";
    }
}
  