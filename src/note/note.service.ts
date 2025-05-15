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
        try {
            await this.dbService.note.delete({
                where:{
                    id: id
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
