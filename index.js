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

const firstDealerCard = document.createElement("div");
const secondDealerCard = document.createElement("div");
const firstPlayerCard = document.createElement("div");
const secondPlayerCard = document.createElement("div");

const updateBetAndBank = (bank = 1000, bet = 0) => {
  document.getElementById("player-bank").innerHTML = `Bank: $${bank}`;
  document.getElementById("bet-amount").innerHTML = `Bet: $${bet}`;
};

const updatePlayerCardsAndScore = () => {
  document.getElementById("player-cards-text").innerHTML = "Player cards: ";
  if (game.player.hand.length === 2) {
    setTimeout(function() {
      firstPlayerCard.innerHTML = `${game.player.hand[0].rank} ${game.player.hand[0].suit}`;
      firstPlayerCard.classList.add("card");
      document.getElementById("player-cards").appendChild(firstPlayerCard);
    }, 1500);
    setTimeout(function() {
      secondPlayerCard.innerHTML = `${game.player.hand[1].rank} ${game.player.hand[1].suit}`;
      secondPlayerCard.classList.add("card");
      document.getElementById("player-cards").appendChild(secondPlayerCard);
    }, 2000);
    setTimeout(function() {
      document.getElementById(
        "player-score"
      ).innerHTML = `Player score: ${game.player.calculateScore()}`;
    }, 2500);
  } else if (game.player.hand.length > 2) {
    setTimeout(function() {
      const newCard = document.createElement("div");
      newCard.innerHTML = `${game.player.hand[game.player.hand.length - 1].rank} ${game.player.hand[game.player.hand.length - 1].suit}`;
      newCard.classList.add("card");
      document.getElementById("player-cards").appendChild(newCard);
    }, 500);
    setTimeout(function() {
      document.getElementById(
        "player-score"
      ).innerHTML = `Player score: ${game.player.calculateScore()}`;
    }, 1000);
  }
};

const updateDealerCardsAndScore = () => {
  document.getElementById("dealer-cards-text").innerHTML = "Dealer cards: ";
  if (game.dealer.hand.length === 2) {
    setTimeout(function() {
      firstDealerCard.innerHTML = `${game.dealer.hand[0].rank} ${game.dealer.hand[0].suit}`;
      firstDealerCard.classList.add("card");
      document.getElementById("dealer-cards").appendChild(firstDealerCard);
    }, 500);
    setTimeout(function() {
      secondDealerCard.innerHTML = `${game.dealer.hand[1].rank} ${game.dealer.hand[1].suit}`;
      secondDealerCard.classList.add("card-back");
      document.getElementById("dealer-cards").appendChild(secondDealerCard);
    }, 1000);
  } else if (game.dealer.hand.length > 2) {
    const newCard = document.createElement("div");
    newCard.innerHTML = `${game.dealer.hand[game.dealer.hand.length - 1].rank} ${game.dealer.hand[game.dealer.hand.length - 1].suit}`;
    newCard.classList.add("card");
    document.getElementById("dealer-cards").appendChild(newCard);
    secondDealerCard.classList.remove("card-back");
  }
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

    document.getElementById("table").classList.remove("hidden");
    document.getElementById("header").setAttribute("style", "display: none");
  });

const addClickToNewGameButton = () =>
  document
    .getElementById("new-game-button")
    .addEventListener("click", function() {
      game.reset();

      const playerCards = document.getElementById("player-cards");
      while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild);
      }

      const dealerCards = document.getElementById("dealer-cards");
      while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.firstChild);
      }

      updateDealerCardsAndScore();
      updatePlayerCardsAndScore();
      updateBetAndBank(game.player.bank, game.player.betAmount);
      document.getElementById("dealer-cards-text").innerHTML = "";
      document.getElementById("dealer-score").innerHTML = "";
      document.getElementById("player-cards-text").innerHTML = "";
      document.getElementById("player-score").innerHTML = "";

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
        updateDealerCardsAndScore();
      }
    }

    document.getElementById(
      "dealer-score"
    ).innerHTML = `Dealer score: ${game.dealer.calculateScore()}`;

    game.processBets();
    updateBetAndBank(game.player.bank, game.player.betAmount);
    game.reset();

    secondDealerCard.classList.remove("card-back");
    secondDealerCard.classList.add("card");

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
    game.player.calculateScore();

    if (game.player.score > 21) {
      game.processBets();
      updateBetAndBank(game.player.bank, game.player.betAmount);

      disable("hit-button");
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
