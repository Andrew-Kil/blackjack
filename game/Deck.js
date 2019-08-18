const Card = require("./Card.js");

module.exports = class Deck {
  constructor() {
    this.cards = this.createDeck();
  }
  createDeck() {
    const cards = [];
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];
    for (let rank of ranks) {
      for (let suit of suits) {
        cards.push(new Card(rank, suit));
      }
    }
    return cards;
  }
  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }
  drawCard() {
    return this.cards.shift();
  }
};
