class Player {
  constructor(deck) {
    this.hand = [];
    this.score = 0;
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
    this.score = 0;
    this.hand.forEach(card => (this.score += card.value));
    if (this.score > 21) {
      this.hand.forEach(card => {
        if (card.rank === "A") this.score -= 10;
      });
    }
    return this.score;
  }
  draw() {
    this.hand.push(this.deck.drawCard());
    return this.hand[this.hand.length - 1];
  }
}

export default Player;
