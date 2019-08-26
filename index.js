import Blackjack from "./game/Blackjack.js";

import {
  createStartButton,
  createDealButton,
  createStandButton,
  createBetOneButton,
  createBetFiveButton,
  createBetTwentyFiveButton,
  createBetHundredButton,
  createBetFiveHundredButton,
  createBetThousandButton,
  createHitButton,
  createNewGameButton,
  disable,
  enable,
  disableAllBets,
  enableAllBets
} from "./helpers";

const game = new Blackjack();

const rootDiv = document.getElementById("blackjack-container");

createStartButton(rootDiv);
createBetOneButton(rootDiv);
createBetFiveButton(rootDiv);
createBetTwentyFiveButton(rootDiv);
createBetHundredButton(rootDiv);
createBetFiveHundredButton(rootDiv);
createBetThousandButton(rootDiv);
createDealButton(rootDiv);
createStandButton(rootDiv);
createHitButton(rootDiv);
createNewGameButton(rootDiv);

disable("bet-one-button");
disable("bet-five-button");
disable("bet-twenty-five-button");
disable("bet-hundred-button");
disable("bet-five-hundred-button");
disable("bet-thousand-button");
disable("deal-button");
disable("stand-button");
disable("hit-button");
disable("new-game-button");

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

const addClickToBetButton = (buttonType, amount) =>
  document.getElementById(buttonType).addEventListener("click", function() {
    if (game.player.bank - amount < 0) {
      disable(buttonType);
      alert("not enough money");
    } else {
      game.player.placeBet(amount);
      updateBetAndBank(game.player.bank, game.player.betAmount);
    }
  });

const addClickToStartButton = () =>
  document.getElementById("start-button").addEventListener("click", function() {
    game.startGame();

    updateBetAndBank(game.player.bank, game.player.betAmount);

    disable("start-button");
    enable("deal-button");
    enableAllBets();
  });

const addClickToNewGameButton = () =>
  document
    .getElementById("new-game-button")
    .addEventListener("click", function() {
      game.reset();

      updateDealerCardsAndScore();
      updatePlayerCardsAndScore();
      updateBetAndBank(game.player.bank, game.player.betAmount);

      disable("new-game-button");
      enable("deal-button");
      enableAllBets();
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

    disable("stand-button");
    disable("hit-button");
    disable("bet-hundred-button");
    disable("deal-button");
    enable("new-game-button");

    if (game.isGameOver()) {
      alert("game over");
      disable("new-game-button");
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
        disable("stand-button");
        disable("hit-button");
        disable("new-game-button");
      }
    } else {
      enable("stand-button");
      enable("hit-button");
      disable("new-game-button");
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

      disable("deal-button");
      enable("stand-button");
      enable("hit-button");
      disableAllBets();
    }
  });

addClickToBetButton("bet-one-button", 1);
addClickToBetButton("bet-five-button", 5);
addClickToBetButton("bet-twenty-five-button", 25);
addClickToBetButton("bet-hundred-button", 100);
addClickToBetButton("bet-five-hundred-button", 500);
addClickToBetButton("bet-thousand-button", 1000);

addClickToStartButton();
addClickToNewGameButton();
addClickToStandButton();
addClickToHitButton();
addClickToDealButton();

updateBetAndBank();
