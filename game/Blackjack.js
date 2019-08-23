import Player from "./Player.js";
import Deck from "./Deck.js";

class Blackjack {
  constructor() {
    this.deck = null;
    this.player = null;
    this.dealer = null;
  }
  newDeck() {
    this.deck = new Deck();
    this.deck.shuffle();
  }
  startGame() {
    this.newDeck();
    this.player = new Player(this.deck);
    this.dealer = new Player(this.deck);
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
  reset() {
    this.player.hand = [];
    this.dealer.hand = [];
    this.player.betAmount = 0;
  }
  endGame() {}
}

export default Blackjack;
