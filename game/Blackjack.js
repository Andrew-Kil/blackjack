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
    this.player.hand.push(this.deck.drawCard());
    this.dealer.hand.push(this.deck.drawCard());
    this.player.hand.push(this.deck.drawCard());
    this.dealer.hand.push(this.deck.drawCard());
  }
}

export default Blackjack;
