"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckController = void 0;
const common_1 = require("@nestjs/common");
const deck_service_1 = require("./deck.service");
const create_deck_dto_1 = require("./dto/create-deck.dto");
const update_deck_dto_1 = require("./dto/update-deck.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const import_deck_dto_1 = require("./dto/import-deck.dto");
const commander_validator_1 = require("./validators/commander-validator");
const cache_manager_1 = require("@nestjs/cache-manager");
let DeckController = class DeckController {
    constructor(deckService, cacheManager) {
        this.deckService = deckService;
        this.cacheManager = cacheManager;
    }
    async getCommander(name) {
        if (!name) {
            throw new Error('Missing "name" query parameter');
        }
        return this.deckService.fetchCommander(name);
    }
    async createDeckWithCommander(commanderName, deckName, req) {
        const userEmail = req.user.email;
        const newDeck = await this.deckService.createDeckWithCommander(commanderName, deckName, userEmail);
        const cacheKey = `myDecks_${userEmail}`;
        await this.cacheManager.del(cacheKey);
        return newDeck;
    }
    async getMyDecks(req) {
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
    async importDeck(importDeckDto, req) {
        const isValid = (0, commander_validator_1.validateCommanderDeck)(importDeckDto);
        if (!isValid) {
            throw new common_1.BadRequestException('O baralho não segue as regras do formato Commander.');
        }
        const userEmail = req.user.email;
        const deckImport = await this.deckService.create(importDeckDto);
        const cacheKey = `myDecks_${userEmail}`;
        await this.cacheManager.del(cacheKey);
        return deckImport;
    }
    async getAllDecks() {
        return this.deckService.findAll();
    }
    async createDeck(deck, req) {
        const userEmail = req.user.email;
        const newDeckManual = await this.deckService.create(deck);
        const cacheKey = `myDecks_${userEmail}`;
        await this.cacheManager.del(cacheKey);
        return newDeckManual;
    }
    async getById(id) {
        return this.deckService.findById(id);
    }
    async updateDeck(id, deck, req) {
        const userEmail = req.user.email;
        const updateDeck = await this.deckService.updateById(id, deck);
        const cacheKey = `myDecks_${userEmail}`;
        await this.cacheManager.del(cacheKey);
        return updateDeck;
    }
    async deleteById(id, req) {
        const userEmail = req.user.email;
        const deleteDeck = await this.deckService.deleteById(id);
        const cacheKey = `myDecks_${userEmail}`;
        await this.cacheManager.del(cacheKey);
        return deleteDeck;
    }
};
exports.DeckController = DeckController;
__decorate([
    (0, common_1.Get)('commander'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getCommander", null);
__decorate([
    (0, common_1.Post)('newDeckWithCommander'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('commanderName')),
    __param(1, (0, common_1.Query)('deckName')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "createDeckWithCommander", null);
__decorate([
    (0, common_1.Get)('myDecks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getMyDecks", null);
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [import_deck_dto_1.ImportDeckDto, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "importDeck", null);
__decorate([
    (0, common_1.Get)('allDecks'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getAllDecks", null);
__decorate([
    (0, common_1.Post)('newDeckManual'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deck_dto_1.createDeckDto, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "createDeck", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/updateDeck/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deck_dto_1.updateDeckDto, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "updateDeck", null);
__decorate([
    (0, common_1.Delete)('/deleteDeck/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeckController.prototype, "deleteById", null);
exports.DeckController = DeckController = __decorate([
    (0, common_1.Controller)('deck'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [deck_service_1.DeckService, Object])
], DeckController);
//# sourceMappingURL=deck.controller.js.map