import { Colors } from "../schemas/deck.schema";
export declare class updateDeckDto {
    readonly name: string;
    readonly commanderName: string;
    readonly cards: string[];
    readonly colors: Colors[];
    readonly userEmail: string;
}
