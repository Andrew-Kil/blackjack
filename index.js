import Blackjack from "./game/Blackjack.js";

import {
  disable,
  enable,
  disableAllBets,
  disableAllActions,
  enableAllBets
} from "./helpers";

const game = new Blackjack();

disableAllBets();
disableAllActions();

const updateBetAndBank = (bank = 1000, bet = 0) => {
  document.getElementById("player-bank").innerHTML = `Bank: $${bank}`;
  document.getElementById("bet-amount").innerHTML = `Bet: $${bet}`;
};

const updatePlayerCardsAndScore = () => {
  document.getElementById(
    "player-cards"
  ).innerHTML = `Player cards: ${game.player.hand.map(
    card => `${card.rank}${card.suit}`
  )}`;
  document.getElementById(
    "player-score"
  ).innerHTML = `Player score: ${game.player.calculateScore()}`;
};

const updateDealerCardsAndScore = () => {
  document.getElementById(
    "dealer-cards"
  ).innerHTML = `Dealer cards: ${game.dealer.hand.map(
    card => `${card.rank}${card.suit}`
  )}`;
  document.getElementById(
    "dealer-score"
  ).innerHTML = `Dealer score: ${game.dealer.calculateScore()}`;
};

const addClickToBetButton = (buttonType, amount) =>
  document.getElementById(buttonType).addEventListener("click", function() {
    if (game.player.bank - amount < 0) {
      disable(buttonType);
      alert("Not enough money");
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
  });

const addClickToHitButton = () =>
  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.draw();

    updatePlayerCardsAndScore();

    if (game.player.score > 21) {
      game.processBets();

      updateBetAndBank(game.player.bank, game.player.betAmount);
      updateDealerCardsAndScore();

      disable("stand-button");
      disable("hit-button");
      enable("new-game-button");
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
