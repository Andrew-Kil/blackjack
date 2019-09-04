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

const firstCardDiv = document.createElement("div");
const secondCardDiv = document.createElement("div");

const updateBetAndBank = (bank = 1000, bet = 0) => {
  document.getElementById("player-bank").innerHTML = `Bank: $${bank}`;
  document.getElementById("bet-amount").innerHTML = `Bet: $${bet}`;
};

const updatePlayerCardsAndScore = () => {
  document.getElementById("player-cards-text").innerHTML = "Player cards: ";
  if (game.player.hand.length === 2) {
    game.player.hand.map(card => {
      const cardDiv = document.createElement("div");
      cardDiv.innerHTML = `${card.rank} ${card.suit}`;
      cardDiv.classList.add("card");
      document.getElementById("player-cards").appendChild(cardDiv);
    });
  } else if (game.player.hand.length > 2) {
    const newCardDiv = document.createElement("div");
    newCardDiv.innerHTML = `${game.player.hand[game.player.hand.length - 1].rank} ${game.player.hand[game.player.hand.length - 1].suit}`;
    newCardDiv.classList.add("card");
    document.getElementById("player-cards").appendChild(newCardDiv);
  }
  document.getElementById(
    "player-score"
  ).innerHTML = `Player score: ${game.player.calculateScore()}`;
};

const updateDealerCardsAndScore = () => {
  document.getElementById("dealer-cards-text").innerHTML = "Dealer cards: ";
  if (game.dealer.hand.length === 2) {
    firstCardDiv.innerHTML = `${game.dealer.hand[0].rank} ${game.dealer.hand[0].suit}`;
    firstCardDiv.classList.add("card");
    document.getElementById("dealer-cards").appendChild(firstCardDiv);

    secondCardDiv.innerHTML = `${game.dealer.hand[1].rank} ${game.dealer.hand[1].suit}`;
    secondCardDiv.classList.add("card-back");
    document.getElementById("dealer-cards").appendChild(secondCardDiv);
  } else if (game.dealer.hand.length > 2) {
    let newCardDiv = document.createElement("div");
    newCardDiv.innerHTML = `${game.dealer.hand[game.dealer.hand.length - 1].rank} ${game.dealer.hand[game.dealer.hand.length - 1].suit}`;
    newCardDiv.classList.add("card");
    document.getElementById("dealer-cards").appendChild(newCardDiv);
  }
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

    game.processBets();
    updateBetAndBank(game.player.bank, game.player.betAmount);
    game.reset();

    disable("stand-button");
    disable("hit-button");
    disable("bet-hundred-button");
    disable("deal-button");
    enable("new-game-button");

    secondCardDiv.classList.remove("card-back");
    secondCardDiv.classList.add("card");
  });

const addClickToHitButton = () =>
  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.draw();

    updatePlayerCardsAndScore();

    if (game.player.score > 21) {
      game.processBets();

      updateBetAndBank(game.player.bank, game.player.betAmount);

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
