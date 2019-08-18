const Player = require("./Player.js");
const Deck = require("./Deck.js");

module.exports = class Blackjack {
  constructor() {
    this.player = new Player();
    this.dealer = new Player();

    this.deck = new Deck();
    this.deck.shuffle();
  }
  start() {
    console.log("game started");
  }
};
