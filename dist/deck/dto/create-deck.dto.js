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
exports.createDeckDto = void 0;
const class_validator_1 = require("class-validator");
const deck_schema_1 = require("../schemas/deck.schema");
class createDeckDto {
}
exports.createDeckDto = createDeckDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createDeckDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createDeckDto.prototype, "commanderName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], createDeckDto.prototype, "cards", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(deck_schema_1.Colors, { each: true }),
    __metadata("design:type", Array)
], createDeckDto.prototype, "colors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createDeckDto.prototype, "userEmail", void 0);
//# sourceMappingURL=create-deck.dto.js.map