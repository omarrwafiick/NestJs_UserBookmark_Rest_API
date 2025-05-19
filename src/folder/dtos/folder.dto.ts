import { IsNotEmpty, IsString } from "class-validator";

class Main{
    @IsString()
    @IsNotEmpty()
    name:string;
}

export class CreateFolderDto extends Main{ 
    @IsNotEmpty()
    userId
}

export class UpdateFolderDto extends Main{  
    @IsNotEmpty()
    bookmarkIds:number[]; 
}
  