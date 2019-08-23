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
// window.game = game;

const rootDiv = document.getElementById("blackjack-container");

const dealerDiv = document.createElement("div");
const playerDiv = document.createElement("div");

const dealerCardsDiv = document.createElement("div");
const dealerScoreDiv = document.createElement("div");

const playerCardsDiv = document.createElement("div");
const playerScoreDiv = document.createElement("div");

const playerBank = document.createElement("div");
const betAmount = document.createElement("div");

rootDiv.appendChild(playerBank);
rootDiv.appendChild(betAmount);

createStartButton(rootDiv);
createBetHundredButton(rootDiv);
createDealButton(rootDiv);
createNewGameButton(rootDiv);

document.getElementById("bet-hundred-button").disabled = true;
document.getElementById("deal-button").disabled = true;
document.getElementById("new-game-button").disabled = true;

document.getElementById("start-button").addEventListener("click", handleStart);

function handleStart() {
  document.getElementById("start-button").disabled = true;
  document.getElementById("bet-hundred-button").disabled = false;
  document.getElementById("deal-button").disabled = false;

  game.startGame();

  playerBank.innerHTML = `bank: $${game.player.bank}`;

  betAmount.innerHTML = "bet: $0";

  let totalBet = 0;

  document
    .getElementById("bet-hundred-button")
    .addEventListener("click", function() {
      totalBet += 100;
      game.player.placeBet(100);
      betAmount.innerHTML = `bet: $${totalBet}`;
      playerBank.innerHTML = `bank: $${game.player.bank}`;
    });

  document.getElementById("deal-button").addEventListener("click", function() {
    if (game.player.betAmount === 0) {
      window.alert("please place a bet");
    } else {
      document.getElementById("deal-button").disabled = true;
      document.getElementById("bet-hundred-button").disabled = true;

      game.dealCards();

      dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(card => {
        return `${card.rank}${card.suit}`;
      })}`;
      dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

      dealerDiv.appendChild(dealerCardsDiv);
      dealerDiv.appendChild(dealerScoreDiv);
      rootDiv.appendChild(dealerDiv);

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

              betAmount.innerHTML = `bet: $${totalBet}`;
              playerBank.innerHTML = `bank: $${game.player.bank}`;
            }
          }

          game.processBets();

          console.log("bet ", game.player.betAmount);
          console.log("bank ", game.player.bank);

          betAmount.innerHTML = `bet: $${totalBet}`;
          playerBank.innerHTML = `bank: $${game.player.bank}`;

          document.getElementById("new-game-button").disabled = false;

          document
            .getElementById("new-game-button")
            .addEventListener("click", function() {
              document.getElementById("new-game-button").disabled = true;
              document.getElementById("bet-hundred-button").disabled = false;
              document.getElementById("deal-button").disabled = false;

              game.reset();

              dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(
                card => {
                  return `${card.rank}${card.suit}`;
                }
              )}`;
              dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

              playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(
                card => {
                  return `${card.rank}${card.suit}`;
                }
              )}`;
              playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

              document.getElementById("deal-button").disabled = false;
              document.getElementById("bet-hundred-button").disabled = false;

              document.getElementById("new-game-button").disabled = true;

              totalBet = 0;
              betAmount.innerHTML = `bet: $${game.player.betAmount}`;
            });
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

            document.getElementById("new-game-button").disabled = false;

            document
              .getElementById("new-game-button")
              .addEventListener("click", function() {
                document.getElementById("new-game-button").disabled = true;

                game.reset();

                dealerCardsDiv.innerHTML = `dealer cards: ${game.dealer.hand.map(
                  card => {
                    return `${card.rank}${card.suit}`;
                  }
                )}`;
                dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;

                playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(
                  card => {
                    return `${card.rank}${card.suit}`;
                  }
                )}`;
                playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;

                document.getElementById("deal-button").disabled = false;
                document.getElementById("bet-hundred-button").disabled = false;

                totalBet = 0;
                betAmount.innerHTML = `bet: $${game.player.betAmount}`;
              });
          }
        });
    }
  });
}
