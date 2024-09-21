import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class LoginDto {

    @IsNotEmpty()
    @IsEmail( {}, { message: "Por favor, digite um email valido."})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly password: string;
}