import Player from "./Player.js";
import Deck from "./Deck.js";

class Blackjack {
  constructor() {
    this.deck = null;
    this.player = null;
    this.dealer = null;
  }
  startGame() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.player = new Player(this.deck);
    this.dealer = new Player(this.deck);
  }
  playGame() {
    // while (!this.isGameOver()) {

    this.dealCards();
    // while (this.player.playerTurn) {
    //   this.player.checkHand();
    //   console.log("player score ", this.player.score);

    //   this.player.playerTurn = false;
    // }
    // if (this.dealer.playerTurn) {
    //   this.dealer.checkHand(this.dealer);
    //   console.log("dealer score ", this.dealer.score);
    // }
    // }
  }
  isGameOver() {
    return this.player.bank <= 0;
  }
  dealCards() {
    this.player.draw();
    this.dealer.draw();
    this.player.draw();
    this.dealer.draw();
  }
  processBets() {
    const playerScore = this.player.calculateScore();
    const dealerScore = this.dealer.calculateScore();

    if (
      (dealerScore > 21 && playerScore <= 21) ||
      (playerScore > dealerScore && playerScore <= 21)
    ) {
      this.player.bank += this.player.betAmount * 2;
    } else if (dealerScore === playerScore) {
      this.player.bank += this.player.betAmount;
    }
  }
}

export default Blackjack;
