class Player {
  constructor(deck) {
    this.hand = [];
    this.score = 0;
    this.bank = 5000;
    this.betAmount = 0;
    this.playerTurn = true;
    this.deck = deck;
  }
  placeBet(bet) {
    this.betAmount = bet;
    this.bank -= this.betAmount;
    return this.betAmount;
  }
  calculateScore() {
    this.score = 0;
    this.hand.forEach(card => (this.score += card.value));
    return this.score;
  }
  endTurn() {
    this.playerTurn = false;
    console.log("turn ended");
    return this.endTurn;
  }
  checkHand() {
    this.calculateScore();
    if (this.score > 21) {
      this.endTurn();
    }
  }
  stand() {
    console.log("stand");
    this.endTurn();
  }
  hit() {
    console.log("hit");
    console.log(this.deck);
    this.hand.push(this.deck.drawCard());
    console.log(this.hand);
    this.checkHand();
    console.log(this.score);
    return this.hand;
  }
}

export default Player;
