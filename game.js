import Blackjack from "./game/Blackjack.js";

const game = new Blackjack();
// window.game = game;

const rootDiv = document.getElementById("blackjack-container");

const startButton = document.createElement("button");

const dealerDiv = document.createElement("div");
const playerDiv = document.createElement("div");

const startButtonText = document.createTextNode("start");

startButton.setAttribute("id", "start-button");
startButton.appendChild(startButtonText);
rootDiv.appendChild(startButton);

document.getElementById("start-button").addEventListener("click", function() {
  game.start();

  const dealerCardsText = document.createTextNode("dealer cards: ");
  const playerCardsText = document.createTextNode("player cards: ");

  const dealerCardsNode = document.createTextNode(
    game.dealer.hand.map(card => {
      return `${card.value} of ${card.suit}`;
    })
  );
  const playerCardsNode = document.createTextNode(
    game.player.hand.map(card => {
      return `${card.value} of ${card.suit}`;
    })
  );

  dealerDiv.appendChild(dealerCardsText);
  dealerDiv.appendChild(dealerCardsNode);
  rootDiv.appendChild(dealerDiv);

  playerDiv.appendChild(playerCardsText);
  playerDiv.appendChild(playerCardsNode);
  rootDiv.appendChild(playerDiv);
});
