import Blackjack from "./game/Blackjack.js";

import {
  createStartButton,
  createDealButton,
  createStandButton,
  createBetHundredButton,
  createHitButton,
  createNewGameButton,
  disableButton,
  enableButton
} from "./helpers";

const game = new Blackjack();

const rootDiv = document.getElementById("blackjack-container");
const dealerDiv = document.createElement("div");
const dealerCardsDiv = document.createElement("div");
const dealerScoreDiv = document.createElement("div");
const playerDiv = document.createElement("div");
const playerCardsDiv = document.createElement("div");
const playerScoreDiv = document.createElement("div");
const playerBank = document.createElement("div");
const betAmount = document.createElement("div");

dealerDiv.appendChild(dealerCardsDiv);
dealerDiv.appendChild(dealerScoreDiv);
playerDiv.appendChild(playerCardsDiv);
playerDiv.appendChild(playerScoreDiv);
rootDiv.appendChild(dealerDiv);
rootDiv.appendChild(playerDiv);
rootDiv.appendChild(playerBank);
rootDiv.appendChild(betAmount);

createStartButton(rootDiv);
createBetHundredButton(rootDiv);
createDealButton(rootDiv);
createStandButton(rootDiv);
createHitButton(rootDiv);
createNewGameButton(rootDiv);

disableButton("bet-hundred-button");
disableButton("deal-button");
disableButton("stand-button");
disableButton("hit-button");
disableButton("new-game-button");

const updateBetAndBank = () => {
  betAmount.innerHTML = `bet: $${game.player.betAmount}`;
  playerBank.innerHTML = `bank: $${game.player.bank}`;
};

const updatePlayerCardsAndScore = () => {
  playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(
    card => `${card.rank}${card.suit}`
  )}`;
  playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;
};

const updateDealerCardsAndScore = () => {
  dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(
    card => `${card.rank}${card.suit}`
  )}`;
  dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;
};

const addClickToBetHundredButton = () =>
  document
    .getElementById("bet-hundred-button")
    .addEventListener("click", function() {
      game.player.placeBet(100);
      updateBetAndBank();
    });

const addClickToStartButton = () =>
  document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-button").disabled = true;
    document.getElementById("bet-hundred-button").disabled = false;
    document.getElementById("deal-button").disabled = false;

    game.startGame();

    updateBetAndBank();
  });

const addClickToNewGameButton = () =>
  document
    .getElementById("new-game-button")
    .addEventListener("click", function() {
      disableButton("new-game-button");

      game.reset();

      updateDealerCardsAndScore();
      updatePlayerCardsAndScore();

      enableButton("deal-button");
      enableButton("bet-hundred-button");

      betAmount.innerHTML = `bet: $${game.player.betAmount}`;
    });

const addClickToStandButton = () =>
  document.getElementById("stand-button").addEventListener("click", function() {
    game.player.stand();

    enableButton("new-game-button");
    disableButton("stand-button");
    disableButton("hit-button");
    disableButton("bet-hundred-button");
    disableButton("deal-button");

    if (
      game.player.calculateScore() <= 21 &&
      game.player.calculateScore() > game.dealer.calculateScore()
    ) {
      while (
        game.dealer.calculateScore() < 17 ||
        game.dealer.calculateScore() < game.player.calculateScore()
      ) {
        game.dealer.draw();

        updateDealerCardsAndScore();

        updateBetAndBank();
      }
    }

    game.processBets();
    game.reset();

    updateBetAndBank();
  });

const addClickToHitButton = () =>
  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.draw();

    updatePlayerCardsAndScore();

    if (game.player.score > 21) {
      game.processBets();

      disableButton("stand-button");
      disableButton("hit-button");
      enableButton("new-game-button");
    }
  });

document.getElementById("deal-button").addEventListener("click", function() {
  if (game.player.betAmount === 0) {
    window.alert("please place a bet");
  } else {
    game.dealCards();

    updateDealerCardsAndScore();
    updatePlayerCardsAndScore();

    disableButton("deal-button");
    disableButton("bet-hundred-button");
    enableButton("stand-button");
    enableButton("hit-button");
  }
});

addClickToBetHundredButton();
addClickToStartButton();
addClickToNewGameButton();
addClickToStandButton();
addClickToHitButton();
