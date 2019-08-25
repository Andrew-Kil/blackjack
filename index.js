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

const updateBetAndBank = (bank = 1000, bet = 0) => {
  playerBank.innerHTML = `bank: $${bank}`;
  betAmount.innerHTML = `bet: $${bet}`;
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
      if (game.player.bank <= 0) {
        disableButton("bet-hundred-button");
        alert("not enough money");
      } else {
        game.player.placeBet(100);
        updateBetAndBank(game.player.bank, game.player.betAmount);
      }
    });

const addClickToStartButton = () =>
  document.getElementById("start-button").addEventListener("click", function() {
    game.startGame();

    updateBetAndBank(game.player.bank, game.player.betAmount);

    disableButton("start-button");
    enableButton("bet-hundred-button");
    enableButton("deal-button");
  });

const addClickToNewGameButton = () =>
  document
    .getElementById("new-game-button")
    .addEventListener("click", function() {
      game.reset();

      updateDealerCardsAndScore();
      updatePlayerCardsAndScore();
      updateBetAndBank(game.player.bank, game.player.betAmount);

      disableButton("new-game-button");
      enableButton("deal-button");
      enableButton("bet-hundred-button");
    });

const addClickToStandButton = () =>
  document.getElementById("stand-button").addEventListener("click", function() {
    if (
      game.player.calculateScore() <= 21 &&
      game.player.calculateScore() > game.dealer.calculateScore()
    ) {
      while (
        game.dealer.calculateScore() < 17 ||
        game.dealer.calculateScore() < game.player.calculateScore()
      ) {
        game.dealer.draw();

        updateBetAndBank(game.player.bank, game.player.betAmount);
        updateDealerCardsAndScore();
      }
    }

    game.processBets();

    updateBetAndBank(game.player.bank, game.player.betAmount);
    updateDealerCardsAndScore();

    game.reset();

    disableButton("stand-button");
    disableButton("hit-button");
    disableButton("bet-hundred-button");
    disableButton("deal-button");
    enableButton("new-game-button");

    if (game.isGameOver()) {
      alert("game over");
      disableButton("new-game-button");
    }
  });

const addClickToHitButton = () =>
  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.draw();

    updatePlayerCardsAndScore();

    if (game.player.score > 21) {
      game.processBets();

      updateBetAndBank(game.player.bank, game.player.betAmount);
      updateDealerCardsAndScore();

      if (game.isGameOver()) {
        alert("game over");
        disableButton("stand-button");
        disableButton("hit-button");
        disableButton("new-game-button");
      }
    } else {
      enableButton("stand-button");
      enableButton("hit-button");
      disableButton("new-game-button");
    }
  });

const addClickToDealButton = () =>
  document.getElementById("deal-button").addEventListener("click", function() {
    if (game.player.betAmount === 0) {
      alert("please place a bet");
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
addClickToDealButton();

updateBetAndBank();
