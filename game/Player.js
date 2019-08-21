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
    this.betAmount += bet;
    this.bank -= bet;
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
  draw() {
    console.log("hit");
    console.log(this.deck);
    this.hand.push(this.deck.drawCard());
    console.log(this.deck);
    console.log(this.hand);
    this.checkHand();
    console.log(this.score);
    return this.hand[this.hand.length - 1];
  }
}

export default Player;
