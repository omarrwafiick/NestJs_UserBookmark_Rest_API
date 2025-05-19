import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { NoteModule } from './note/note.module';
import { FolderModule } from './folder/folder.module';
import { VisitModule } from './visit/visit.module';
import { TagModule } from './tag/tag.module';
import { SharedModule } from './shared/shared.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule, 
    UserModule, 
    BookmarkModule, 
    PrismaModule, 
    NoteModule, 
    FolderModule, 
    VisitModule, 
    TagModule, 
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
