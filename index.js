import Blackjack from "./game/Blackjack.js";

import {
  createStartButton,
  createDealButton,
  createStandButton,
  createBetHundredButton,
  createHitButton
} from "./helpers";

const game = new Blackjack();
// window.game = game;

const rootDiv = document.getElementById("blackjack-container");

createStartButton(rootDiv);

const dealerDiv = document.createElement("div");
const playerDiv = document.createElement("div");

document.getElementById("start-button").addEventListener("click", function() {
  rootDiv.removeChild(document.getElementById("start-button"));

  game.startGame();

  const playerBank = document.createElement("div");
  playerBank.innerHTML = `bank: $${game.player.bank}`;
  rootDiv.appendChild(playerBank);

  const betAmount = document.createElement("div");
  betAmount.innerHTML = "bet: $0";
  rootDiv.appendChild(betAmount);

  createBetHundredButton(rootDiv);

  let totalBet = 0;
  document
    .getElementById("bet-hundred-button")
    .addEventListener("click", function() {
      totalBet += 100;
      game.player.placeBet(100);
      betAmount.innerHTML = `bet: $${totalBet}`;
      playerBank.innerHTML = `bank: $${game.player.bank}`;
    });

  createDealButton(rootDiv);

  document.getElementById("deal-button").addEventListener("click", function() {
    if (game.player.betAmount === 0) {
      window.alert("please place a bet");
    } else {
      rootDiv.removeChild(document.getElementById("deal-button"));
      rootDiv.removeChild(document.getElementById("bet-hundred-button"));

      game.playGame();

      const dealerCardsDiv = document.createElement("div");
      const dealerScoreDiv = document.createElement("div");

      dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(card => {
        return `${card.rank}${card.suit}`;
      })}`;
      dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;
      dealerDiv.appendChild(dealerCardsDiv);
      dealerDiv.appendChild(dealerScoreDiv);
      rootDiv.appendChild(dealerDiv);

      const playerCardsDiv = document.createElement("div");
      const playerScoreDiv = document.createElement("div");
      playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(card => {
        return `${card.rank}${card.suit}`;
      })}`;
      playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;
      playerDiv.appendChild(playerCardsDiv);
      playerDiv.appendChild(playerScoreDiv);
      rootDiv.appendChild(playerDiv);

      createStandButton(rootDiv);

      createHitButton(rootDiv);

      document
        .getElementById("stand-button")
        .addEventListener("click", function() {
          game.player.stand();
          rootDiv.removeChild(document.getElementById("stand-button"));
          rootDiv.removeChild(document.getElementById("hit-button"));

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
            }
          }

          game.processBets();

          console.log("bet ", game.player.betAmount);
          console.log("bank ", game.player.bank);
        });

      document
        .getElementById("hit-button")
        .addEventListener("click", function() {
          game.player.draw();

          const lastCard = game.player.hand[game.player.hand.length - 1];
          const playerNewCardNode = document.createTextNode(
            `,${lastCard.rank}${lastCard.suit}`
          );
          playerCardsDiv.appendChild(playerNewCardNode);

          playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

          if (game.player.score > 21) {
            rootDiv.removeChild(document.getElementById("stand-button"));
            rootDiv.removeChild(document.getElementById("hit-button"));
            game.processBets();

            console.log("bet ", game.player.betAmount);
            console.log("bank ", game.player.bank);
          }
        });
    }
  });
});
