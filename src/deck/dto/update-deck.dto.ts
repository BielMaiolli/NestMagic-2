import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Colors } from "../schemas/deck.schema";


export class updateDeckDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly commanderName: string;

    @IsOptional()
    @IsString()
    readonly cards: string[];

    @IsOptional()
    @IsArray()
    @IsEnum(Colors, { each: true })
    readonly colors: Colors[];

    @IsOptional()
    @IsString()
    readonly userEmail: string;
}