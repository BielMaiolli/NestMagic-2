import { IsArray, IsEnum, IsString } from "class-validator";
import { Colors } from "../schemas/deck.schema";


export class createDeckDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly commanderName: string;

    @IsString()
    readonly cards: string[];

    @IsArray()
    @IsEnum(Colors, { each: true })
    readonly colors: Colors[];

    @IsString()
    readonly userEmail: string;
}