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

  const standButton = document.createElement("button");
  const standButtonText = document.createTextNode("stand");
  standButton.setAttribute("id", "stand-button");
  standButton.appendChild(standButtonText);
  rootDiv.appendChild(standButton);

  document.getElementById("stand-button").addEventListener("click", function() {
    game.player.stand();
  });

  const hitButton = document.createElement("button");
  const hitButtonText = document.createTextNode("hit");
  hitButton.setAttribute("id", "hit-button");
  hitButton.appendChild(hitButtonText);
  rootDiv.appendChild(hitButton);

  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.hit();
    const lastCard = game.player.hand[game.player.hand.length - 1];
    const playerNewCardNode = document.createTextNode(
      `,${lastCard.value} of ${lastCard.suit}`
    );
    playerDiv.appendChild(playerNewCardNode);
  });
});
