import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dtos/note.dto";

@Controller('note')
export class NoteController {
    constructor(private noteservice:NoteService){}
    
    @Get(':bookmarkId')
    async getAll(@Param() bookmarkId:number){
        const result = await this.noteservice.getAllNotes(bookmarkId);
        return result.length > 0? result : "Failed";
    }

    @Get(':id')
    async getById(@Param() id:number){
        const result = await this.noteservice.getNoteById(id);
        return result !== null ? result : "Failed";
    }

    @Post('')
    async create(@Body() dto:CreateNoteDto){
        const result = await this.noteservice.createNote(dto);
        return result ? result : "Failed";
    }

    @Delete(':id')
    async delete(@Param() id:number){
        const result = await this.noteservice.deleteNote(id);
        return result ? result : "Failed";
    }
} 