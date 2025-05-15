import { IsNotEmpty, IsString } from "class-validator"

export class CreateSharedDto{
  @IsNotEmpty()
  bookmarkId:number;
  @IsNotEmpty()
  sharedWithId:number;
  @IsNotEmpty()
  @IsString()
  permissions:string;
}