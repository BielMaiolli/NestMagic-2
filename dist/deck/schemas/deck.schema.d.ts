export declare enum Colors {
    WHITE = "W",
    BLUE = "U",
    BLACK = "B",
    RED = "R",
    GREEN = "G"
}
export declare class Deck {
    name: string;
    commanderName: string;
    cards: string[];
    colors: string[];
    userEmail: string;
}
export declare const DeckSchema: import("mongoose").Schema<Deck, import("mongoose").Model<Deck, any, any, any, import("mongoose").Document<unknown, any, Deck> & Deck & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deck, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Deck>> & import("mongoose").FlatRecord<Deck> & {
    _id: import("mongoose").Types.ObjectId;
}>;
