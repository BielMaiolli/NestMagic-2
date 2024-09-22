import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { DeckService } from './deck.service';
import { Deck } from './schemas/deck.schema';
import { createDeckDto } from './dto/create-deck.dto';
import { updateDeckDto } from './dto/update-deck.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ImportDeckDto } from './dto/import-deck.dto';
import { validateCommanderDeck } from './validators/commander-validator';
import { CACHE_MANAGER, CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('deck')
@UseInterceptors(CacheInterceptor)
export class DeckController {

    
constructor(
  private deckService: DeckService,
  @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('commander')
   async getCommander(@Query('name') name: string): Promise<any> {
    if (!name) {
        throw new Error('Missing "name" query parameter');
    }
    return this.deckService.fetchCommander(name);
   }

  
   @Post('newDeckWithCommander')
   @UseGuards(AuthGuard())
   async createDeckWithCommander(
       @Query('commanderName') commanderName: string,
       @Query('deckName') deckName: string,
       @Req() req: any,
   ): Promise<Deck> {
       const userEmail = req.user.email;

       const newDeck = await this.deckService.createDeckWithCommander(commanderName, deckName, userEmail);

       const cacheKey = `myDecks_${userEmail}`;
       
       await this.cacheManager.del(cacheKey);

       return newDeck;
   }

   //////////////////////////////////////////////////////////////////////

  
   @Get('myDecks')
   @UseGuards(AuthGuard())
   async getMyDecks(@Req() req: any) {
     const userEmail = req.user.email;
     
     const cacheKey = `myDecks_${userEmail}`;

     const cachedDecks = await this.cacheManager.get(cacheKey);
     if (cachedDecks) {
       return cachedDecks;
     }

     const decks = await this.deckService.findDecksByEmail(userEmail);
     
     await this.cacheManager.set(cacheKey, decks);

     return decks;
   }


   /////////////////////////////////////////////////////////////////////


   @Post('import')
   @UseGuards(AuthGuard())
   async importDeck(
    @Body() 
    importDeckDto: ImportDeckDto,
    @Req()
    req: any,  
  ) {

     const isValid = validateCommanderDeck(importDeckDto);
     if (!isValid) {
       throw new BadRequestException('O baralho não segue as regras do formato Commander.');
     }
 
     const userEmail = req.user.email;

     const deckImport = await this.deckService.create(importDeckDto);
  
     const cacheKey = `myDecks_${userEmail}`;

     await this.cacheManager.del(cacheKey);
     
     return deckImport;
   }

   //////////////////////////////////////////////////////////////////

  @Get('allDecks')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllDecks(): Promise<Deck[]> {
    return this.deckService.findAll()
  }

  @Post('newDeckManual')
  @UseGuards(AuthGuard())
  async createDeck(
    @Body()
    deck: createDeckDto,
    @Req()
    req: any,
  ): Promise<Deck> {
     const userEmail = req.user.email;
     
     const newDeckManual = await this.deckService.create(deck);

     const cacheKey = `myDecks_${userEmail}`;

     await this.cacheManager.del(cacheKey);

     return newDeckManual;
 
    // return this.deckService.create(deck)
  }

  @Get(':id')
  async getById(
    @Param('id')
    id: string,
  ): Promise<Deck> {
    return this.deckService.findById(id);
  }

  @Put('/updateDeck/:id')
  @UseGuards(AuthGuard())
  async updateDeck(
    @Param('id')
    id: string,
    @Body()
    deck: updateDeckDto,
    @Req()
    req: any,
  ): Promise<Deck> {
    const userEmail = req.user.email;

    const updateDeck = await this.deckService.updateById(id, deck);

    const cacheKey = `myDecks_${userEmail}`;

    await this.cacheManager.del(cacheKey);

    return updateDeck;

    // return this.deckService.updateById(id, deck);
  }

  @Delete('/deleteDeck/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteById(
    @Param('id')
    id: string,
    @Req()
    req: any,
  ): Promise<Deck> {
    const userEmail = req.user.email;

    const deleteDeck = await this.deckService.deleteById(id);

    const cacheKey = `myDecks_${userEmail}`;

    await this.cacheManager.del(cacheKey);

    return deleteDeck;
    //return this.deckService.deleteById(id);
  }


}

