import Player from "./Player.js";
import Deck from "./Deck.js";

class Blackjack {
  constructor() {
    this.player = new Player();
    this.dealer = new Player();
  }
  start() {
    console.log("game started");
    // while (!this.isGameOver()) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.dealCards();
    console.log("player hand ", this.player.hand);
    console.log("dealer hand ", this.dealer.hand);
    this.player.turn = true;
    if (this.player.turn) {
      this.checkHand(this.player);
      console.log("player score ", this.player.score);
    }
    if (this.dealer.turn) {
      this.checkHand(this.dealer);
      console.log("dealer score ", this.dealer.score);
    }
    // }
  }
  isGameOver() {
    return this.player.bank <= 0;
  }
  dealCards() {
    this.player.hand.push(this.deck.drawCard());
    this.dealer.hand.push(this.deck.drawCard());
    this.player.hand.push(this.deck.drawCard());
    this.dealer.hand.push(this.deck.drawCard());
  }
  checkHand(whichPlayer) {
    whichPlayer.checkHand(whichPlayer.hand);
  }
}

export default Blackjack;
