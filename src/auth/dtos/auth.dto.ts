import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty() 
    password: string;
}


export class AddUserDto{
    @IsString()
    @IsNotEmpty() 
    firstName: string;
    @IsString()
    @IsNotEmpty() 
    lastName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty() 
    password: string;
}