const Deck = require("./Deck.js");

module.exports = class Player {
  constructor() {
    this.hand = [];
    this.score = 0;
    this.bank = 5000;
    this.turn = false;
  }
  calculateScore() {
    // calculateScore is called every time the player performs an action
    this.hand.forEach(card => (this.score += card.value));
  }
  endTurn() {
    this.turn = !this.turn;
  }
  checkHand() {
    // checkHand is called every time the player performs an action (after calculateScore)
    this.calculateScore();
    if (this.score > 21) {
      this.endTurn();
    }
  }
  stand() {
    // player turn ends and dealer turn begins. dealer reveals hidden card and performs their series of events
    this.endTurn();
  }
  hit() {
    // player draws one card. player can hit as many times as they want. if score > 21, dealer reveals hidden card and wins
  }
};
