import Blackjack from "./game/Blackjack.js";

import {
  createStartButton,
  createDealButton,
  createStandButton,
  createBetHundredButton,
  createHitButton,
  createNewGameButton
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

document.getElementById("bet-hundred-button").disabled = true;
document.getElementById("deal-button").disabled = true;
document.getElementById("stand-button").disabled = true;
document.getElementById("hit-button").disabled = true;
document.getElementById("new-game-button").disabled = true;

let totalBet = 0;

const updateBetAndBank = () => {
  betAmount.innerHTML = `bet: $${totalBet}`;
  playerBank.innerHTML = `bank: $${game.player.bank}`;
};

const addClickToBetHundredButton = () =>
  document
    .getElementById("bet-hundred-button")
    .addEventListener("click", function() {
      totalBet += 100;
      game.player.placeBet(100);
      updateBetAndBank();
    });

addClickToBetHundredButton();

const addClickToStartButton = () =>
  document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-button").disabled = true;
    document.getElementById("bet-hundred-button").disabled = false;
    document.getElementById("deal-button").disabled = false;

    game.startGame();

    updateBetAndBank();
  });

addClickToStartButton();

const addClickToNewGameButton = () =>
  document
    .getElementById("new-game-button")
    .addEventListener("click", function() {
      document.getElementById("new-game-button").disabled = true;

      game.reset();

      dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(card => {
        return `${card.rank}${card.suit}`;
      })}`;
      dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

      playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(card => {
        return `${card.rank}${card.suit}`;
      })}`;
      playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

      document.getElementById("deal-button").disabled = false;
      document.getElementById("bet-hundred-button").disabled = false;

      totalBet = 0;
      betAmount.innerHTML = `bet: $${game.player.betAmount}`;
    });

addClickToNewGameButton();

const addClickToStandButton = () =>
  document.getElementById("stand-button").addEventListener("click", function() {
    game.player.stand();

    document.getElementById("stand-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("new-game-button").disabled = false;
    document.getElementById("bet-hundred-button").disabled = true;
    document.getElementById("deal-button").disabled = true;

    if (
      game.player.calculateScore() <= 21 &&
      game.player.calculateScore() > game.dealer.calculateScore()
    ) {
      while (
        game.dealer.calculateScore() < 17 ||
        game.dealer.calculateScore() < game.player.calculateScore()
      ) {
        game.dealer.draw();
        dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(
          card => `${card.rank}${card.suit}`
        )}`;
        dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

        betAmount.innerHTML = `bet: $${totalBet}`;
        playerBank.innerHTML = `bank: $${game.player.bank}`;
      }
    }

    game.processBets();
    game.reset();

    totalBet = 0;

    updateBetAndBank();
  });

const addClickToHitButton = () =>
  document.getElementById("hit-button").addEventListener("click", function() {
    game.player.draw();

    const lastCard = game.player.hand[game.player.hand.length - 1];
    const playerNewCardNode = document.createTextNode(
      `,${lastCard.rank}${lastCard.suit}`
    );
    playerCardsDiv.appendChild(playerNewCardNode);

    playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

    if (game.player.score > 21) {
      document.getElementById("stand-button").disabled = true;
      document.getElementById("hit-button").disabled = true;
      game.processBets();

      document.getElementById("new-game-button").disabled = false;
    }
  });

document.getElementById("deal-button").addEventListener("click", function() {
  if (game.player.betAmount === 0) {
    window.alert("please place a bet");
  } else {
    document.getElementById("deal-button").disabled = true;
    document.getElementById("bet-hundred-button").disabled = true;

    game.dealCards();

    dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(
      card => `${card.rank}${card.suit}`
    )}`;
    dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

    playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(
      card => `${card.rank}${card.suit}`
    )}`;
    playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

    document.getElementById("stand-button").disabled = false;
    document.getElementById("hit-button").disabled = false;

    addClickToStandButton();
    addClickToHitButton();
  }
});
