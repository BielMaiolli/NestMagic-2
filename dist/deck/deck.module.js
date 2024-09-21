"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckModule = void 0;
const common_1 = require("@nestjs/common");
const deck_controller_1 = require("./deck.controller");
const deck_service_1 = require("./deck.service");
const mongoose_1 = require("@nestjs/mongoose");
const deck_schema_1 = require("./schemas/deck.schema");
const auth_module_1 = require("../auth/auth.module");
const cache_manager_1 = require("@nestjs/cache-manager");
let DeckModule = class DeckModule {
};
exports.DeckModule = DeckModule;
exports.DeckModule = DeckModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({
                ttl: 10,
                max: 100,
            }),
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Deck', schema: deck_schema_1.DeckSchema }])
        ],
        controllers: [deck_controller_1.DeckController],
        providers: [deck_service_1.DeckService],
    })
], DeckModule);
//# sourceMappingURL=deck.module.js.map