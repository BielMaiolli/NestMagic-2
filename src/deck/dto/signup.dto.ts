import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';


export class SignUpDto {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail( {}, { message: "Por favor, digite um email valido."})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly password: string;

    @IsOptional()
    readonly role: string[];
}