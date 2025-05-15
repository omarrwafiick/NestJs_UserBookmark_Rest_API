import { IsNotEmpty, IsString } from "class-validator";

export class CreateFolderDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    userId
}

export class UpdateFolderDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    bookmarkIds:number[]; 
}
  