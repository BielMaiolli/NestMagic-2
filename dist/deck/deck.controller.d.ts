import { DeckService } from './deck.service';
import { Deck } from './schemas/deck.schema';
import { createDeckDto } from './dto/create-deck.dto';
import { updateDeckDto } from './dto/update-deck.dto';
import { ImportDeckDto } from './dto/import-deck.dto';
import { Cache } from 'cache-manager';
export declare class DeckController {
    private deckService;
    private cacheManager;
    constructor(deckService: DeckService, cacheManager: Cache);
    getCommander(name: string): Promise<any>;
    createDeckWithCommander(commanderName: string, deckName: string, req: any): Promise<Deck>;
    getMyDecks(req: any): Promise<unknown>;
    importDeck(importDeckDto: ImportDeckDto, req: any): Promise<Deck>;
    getAllDecks(): Promise<Deck[]>;
    createDeck(deck: createDeckDto, req: any): Promise<Deck>;
    getById(id: string): Promise<Deck>;
    updateDeck(id: string, deck: updateDeckDto, req: any): Promise<Deck>;
    deleteById(id: string, req: any): Promise<Deck>;
}
