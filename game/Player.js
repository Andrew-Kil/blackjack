module.exports = class Player {
  constructor() {
    this.hand = [];
    this.score = 0;
  }
  calculateScore() {
    // calculateScore is called every time the player performs an action
    // this.score = this.hand.reduce((a, b) => a + b);
  }
  endTurn() {
    playerTurn = !playerTurn;
    dealerTurn = !dealerTurn;
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
