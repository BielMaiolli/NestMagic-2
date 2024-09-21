"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommanderDeck = validateCommanderDeck;
function validateCommanderDeck(deck) {
    if (deck.cards.length !== 99) {
        return false;
    }
    const uniqueColors = new Set(deck.colors);
    if (uniqueColors.size < 1 || uniqueColors.size > 5) {
        return false;
    }
    if (!deck.commanderName) {
        return false;
    }
    return true;
}
//# sourceMappingURL=commander-validator.js.map