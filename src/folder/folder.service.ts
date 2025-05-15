import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto, UpdateFolderDto } from './dtos/folder.dto';
import { Bookmark, Folder } from 'generated/prisma';

@Injectable()
export class FolderService {
    constructor(private dbService: PrismaService){}
    
    async getAll(userid: number):Promise<Folder[]>{
        try {
            return await this.dbService.folder.findMany({
                where:{
                    userId: userid
                }
            });
        } catch (error) {
            return [];
        }
    }

    async getById(id: number):Promise<Folder|null>{
        try {
            return await this.dbService.folder.findUnique({
                where:{
                    id: id
                }
            });
        } catch (error) {
            return null;
        }
    }

    async createFolder(dto: CreateFolderDto):Promise<boolean>{
        try {
            await this.dbService.folder.create({
                data:{
                    name: dto.name,
                    userId: dto.userId
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateFolder(dto: UpdateFolderDto, id: number):Promise<boolean>{
        try {
            await this.dbService.folder.update({
                where: {
                    id: id,
                },
                data: {
                    name: dto.name,
                    bookmarks: {
                        connect: dto.bookmarkIds.map((bookmarkId) => ({ id: bookmarkId })),
                    },
                },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteFolder(id: number):Promise<boolean>{
        try {
            await this.dbService.folder.delete({
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
