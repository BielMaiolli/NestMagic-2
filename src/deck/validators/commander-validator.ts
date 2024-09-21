export function validateCommanderDeck(deck: any): boolean {
    // Validar número de cartas
    if (deck.cards.length !== 99) {
      return false;
    }
  
    // Validar cores
    const uniqueColors = new Set(deck.colors);
    if (uniqueColors.size < 1 || uniqueColors.size > 5) {
      return false;
    }
  
    // Validar o comandante
    if (!deck.commanderName) {
      return false;
    }
  
    return true;
  }