let playerTurn = true;
let dealerTurn = false;
// by default, player always goes before dealer

let startGame = false;
// if startGame is true, player is dealt 1 card, dealer is dealt 1 card (face-down), player is dealt 1 card,  dealer is dealt 1 card (face-up). playerTurn is true, player goes first

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

let playerScore = 0;
let dealerScore = 0;

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }
  createDeck() {
    for (let rank of ranks) {
      for (let suit of suits) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }
  shuffleDeck() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }
  dealCard() {
    return this.cards.shift();
  }
}

class Player {
  constructor() {
    this.hand = [];
  }
  calculateScore() {
    // calculateScore is called every time the player performs an action
    playerScore = this.hand.reduce((a, b) => a + b);
  }
  checkHand() {
    // checkHand is called every time the player performs an action (after calculateScore)
    if (playerScore > 21) {
      playerTurn = false;
      dealerTurn = true;
    }
  }
  stand() {
    // player turn ends and dealer turn begins. dealer reveals hidden card and performs their series of events
  }
  hit() {
    // player draws one card. player can hit as many times as they want. if score > 21, dealer reveals hidden card and wins
  }
}

let deck = new Deck();
deck.createDeck();
console.log(deck.cards);
deck.shuffleDeck();
console.log(deck.cards);
console.log("draw", deck.dealCard());
console.log(deck.cards.length);
console.log("draw", deck.dealCard());
console.log(deck.cards.length);
console.log("draw", deck.dealCard());
console.log(deck.cards.length);
console.log(deck.cards);
