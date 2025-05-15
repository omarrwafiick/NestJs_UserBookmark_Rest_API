import { IsNotEmpty, IsString } from "class-validator";


export class CreateBookmarkDto{
  @IsString()
  @IsNotEmpty()
  title:string;
  @IsString()
  @IsNotEmpty()
  description:string;
  @IsString() 
  favicon:string;
  @IsString()
  @IsNotEmpty()
  link:string ;
  @IsNotEmpty()
  userId:number;
}

export class UpdateBookmarkDto{
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
 