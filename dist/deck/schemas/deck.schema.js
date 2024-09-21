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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckSchema = exports.Deck = exports.Colors = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Colors;
(function (Colors) {
    Colors["WHITE"] = "W";
    Colors["BLUE"] = "U";
    Colors["BLACK"] = "B";
    Colors["RED"] = "R";
    Colors["GREEN"] = "G";
})(Colors || (exports.Colors = Colors = {}));
let Deck = class Deck {
};
exports.Deck = Deck;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Deck.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Deck.prototype, "commanderName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Deck.prototype, "cards", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Deck.prototype, "colors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Deck.prototype, "userEmail", void 0);
exports.Deck = Deck = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Deck);
exports.DeckSchema = mongoose_1.SchemaFactory.createForClass(Deck);
//# sourceMappingURL=deck.schema.js.map