let playerTurn = true;
let dealerTurn = false;
// by default, player always goes before dealer

let startGame = false;
// if startGame is true, player is dealt 1 card, dealer is dealt 1 card (face-down), player is dealt 1 card,  dealer is dealt 1 card (face-up). playerTurn is true, player goes first

class Game {
  constructor() {
    this.suits = ["clubs", "diamonds", "hearts", "spades"];
    this.ranks = [
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
    this.newDeck = new Deck();
  }
  newGame() {
    this.newDeck.createDeck();
    this.newDeck.shuffleDeck();
  }
}

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = convertRankToValue(rank);
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
}

const convertRankToValue = rank => {
  if (["J", "Q", "K"].includes(rank)) return 10;
  else if (rank === "A") return 11;
  else return +rank;
};

let game = new Game();
game.newGame();
console.log(newDeck);

// let deck = new Deck();
// deck.createDeck();
// console.log(deck.cards);
// deck.shuffleDeck();
// console.log(deck.cards);
// console.log("draw", deck.dealCard());
// console.log(deck.cards.length);
// console.log("draw", deck.dealCard());
// console.log(deck.cards.length);
// console.log("draw", deck.dealCard());
// console.log(deck.cards.length);
// console.log(deck.cards);

// console.log("card is ", deck.cards[0], convertRankToValue(deck.cards[0].rank));

// let bob = new Player();
// console.log("playerTurn ", playerTurn);
// console.log("dealerTurn ", dealerTurn);
// bob.endTurn();
// console.log("playerTurn ", playerTurn);
// console.log("dealerTurn ", dealerTurn);
// bob.stand();
// console.log("playerTurn ", playerTurn);
// console.log("dealerTurn ", dealerTurn);

// let dealer = new Player();
