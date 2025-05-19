import { IsNotEmpty, IsString } from "class-validator";

class Main {
  @IsString()
  @IsNotEmpty()
  title:string;
  @IsString()
  @IsNotEmpty()
  description:string;
  @IsString()
  @IsNotEmpty()
  link:string ; 
  @IsString() 
  favicon:string;
}

export class CreateBookmarkDto extends Main{
 
  @IsNotEmpty()
  userId:number;
}

export class UpdateBookmarkDto extends Main{
   
}
 