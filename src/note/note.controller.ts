import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dtos/note.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller('note')
export class NoteController {
    constructor(private noteservice:NoteService){}
    
    @Get('bybookmark/:bookmarkId')
    async getAll(@Param('bookmarkId', ParseIntPipe)  bookmarkId:number){
        const result = await this.noteservice.getAllNotes(bookmarkId);
        return result.length > 0? result : "Failed";
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id:number){
        const result = await this.noteservice.getNoteById(id);
        return result !== null ? result : "Failed";
    }

    @Post('')
    async create(@Body() dto:CreateNoteDto){
        const result = await this.noteservice.createNote(dto);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        const result = await this.noteservice.deleteNote(id);
        return result ? result : "Failed";
    }
} 