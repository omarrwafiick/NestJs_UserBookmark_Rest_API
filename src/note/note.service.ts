import { Injectable } from '@nestjs/common';
import { Note } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dtos/note.dto';

@Injectable()
export class NoteService {
    constructor(private dbService: PrismaService){}
    
    async getAllNotes(bookmarkId: number):Promise<Note[]>{
        try {
            return await this.dbService.note.findMany({
                where:{
                    bookmarkId: bookmarkId
                }
            });
        } catch (error) {
            return [];
        }
    }

    async getNoteById(id: number):Promise<Note|null>{
        try {
            return await this.dbService.note.findUnique({
                where:{
                    id: id
                }
            });
        } catch (error) {
            return null;
        }
    }

    async createNote(dto: CreateNoteDto):Promise<boolean>{
        try {
            const reachMax = await this.dbService.bookmark.findFirst({
                where:{
                    id: dto.bookmarkId
                },
                include:{
                    notes: true
                }
            });
            if (!reachMax) return false;
            console.log(reachMax.notes.length)
            if(reachMax.notes.length > 6) return false;
            await this.dbService.note.create({
                data:{
                    title: dto.title,
                    description: dto.description,
                    bookmarkId: dto.bookmarkId
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    } 

    async deleteNote(id: number):Promise<boolean>{
        return this.dbService.deleteById('note', id);
    }
}
