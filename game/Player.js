class Player {
  constructor(deck) {
    this.hand = [];
    this.bank = 1000;
    this.betAmount = 0;
    this.deck = deck;
  }
  placeBet(bet) {
    this.betAmount += bet;
    this.bank -= bet;
    return this.betAmount;
  }
  calculateScore() {
    let score = 0;
    this.hand.forEach(card => (score += card.value));
    if (score > 21) {
      this.hand.forEach(card => {
        if (card.rank === "A") score -= 10;
      });
    }
    return score;
  }
  draw() {
    this.hand.push(this.deck.drawCard());
    return this.hand[this.hand.length - 1];
  }
}

export default Player;
