import Blackjack from "./game/Blackjack.js";

const game = new Blackjack();
window.game = game;

game.start();

const rootDiv = document.getElementById("blackjack_container");

const divOne = document.createElement("div");
const divTwo = document.createElement("div");

const dealersCardsNode = document.createTextNode(
  game.dealer.hand.map(card => {
    return `${card.value} of ${card.suit}`;
  })
);

divOne.appendChild(dealersCardsNode);

rootDiv.appendChild(divOne);
