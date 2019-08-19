import Blackjack from "./game/Blackjack.js";

const game = new Blackjack();
// window.game = game;

const rootDiv = document.getElementById("blackjack-container");

const betButton = document.createElement("button");

const dealerDiv = document.createElement("div");
const playerDiv = document.createElement("div");

const betButtonText = document.createTextNode("bet");

betButton.setAttribute("id", "bet-button");
betButton.appendChild(betButtonText);

rootDiv.appendChild(betButton);

document.getElementById("bet-button").addEventListener("click", function() {
  const betHundredButton = document.createElement("button");
  const betHundredButtonText = document.createTextNode("100");
  betHundredButton.setAttribute("id", "bet-hundred-button");
  betHundredButton.appendChild(betHundredButtonText);
  rootDiv.appendChild(betHundredButton);

  const playerBank = document.createElement("div");
  const playerBankText = document.createTextNode(`$${game.player.bank}`);
  playerBank.appendChild(playerBankText);

  const startButton = document.createElement("button");
  const startButtonText = document.createTextNode("start");
  startButton.setAttribute("id", "start-button");
  startButton.appendChild(startButtonText);
  rootDiv.appendChild(startButton);

  document.getElementById("start-button").addEventListener("click", function() {
    game.start();

    const dealerCardsDiv = document.createElement("div");
    const playerCardsDiv = document.createElement("div");

    const dealerScoreDiv = document.createElement("div");
    const playerScoreDiv = document.createElement("div");

    const dealerCardsText = document.createTextNode("dealer cards: ");
    const playerCardsText = document.createTextNode("player cards: ");

    const dealerScoreText = document.createTextNode("dealer score: ");
    const playerScoreText = document.createTextNode("player score: ");

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

    const dealerScoreNode = document.createTextNode(
      game.dealer.calculateScore()
    );
    let playerScoreNode = document.createTextNode(game.player.calculateScore());

    dealerCardsDiv.appendChild(dealerCardsText);
    dealerCardsDiv.appendChild(dealerCardsNode);
    dealerScoreDiv.appendChild(dealerScoreText);
    dealerScoreDiv.appendChild(dealerScoreNode);
    dealerDiv.appendChild(dealerCardsDiv);
    dealerDiv.appendChild(dealerScoreDiv);
    rootDiv.appendChild(dealerDiv);

    playerCardsDiv.appendChild(playerCardsText);
    playerCardsDiv.appendChild(playerCardsNode);
    playerScoreDiv.appendChild(playerScoreText);
    playerScoreDiv.appendChild(playerScoreNode);
    playerDiv.appendChild(playerCardsDiv);
    playerDiv.appendChild(playerScoreDiv);
    rootDiv.appendChild(playerDiv);

    const standButton = document.createElement("button");
    const standButtonText = document.createTextNode("stand");
    standButton.setAttribute("id", "stand-button");
    standButton.appendChild(standButtonText);
    rootDiv.appendChild(standButton);

    document
      .getElementById("stand-button")
      .addEventListener("click", function() {
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
      playerCardsDiv.appendChild(playerNewCardNode);

      playerScoreNode.nodeValue = `${game.player.calculateScore()}`;
    });
  });

  // game.bet();
});
