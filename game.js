import Blackjack from "./game/Blackjack.js";

const game = new Blackjack();
// window.game = game;

const rootDiv = document.getElementById("blackjack-container");

const startButton = document.createElement("button");
startButton.innerHTML = "start";

const dealerDiv = document.createElement("div");
const playerDiv = document.createElement("div");

startButton.setAttribute("id", "start-button");

rootDiv.appendChild(startButton);

document.getElementById("start-button").addEventListener("click", function() {
  rootDiv.removeChild(document.getElementById("start-button"));

  game.startGame();

  const playerBank = document.createElement("div");
  playerBank.innerHTML = `bank: $${game.player.bank}`;
  rootDiv.appendChild(playerBank);

  const betAmount = document.createElement("div");
  betAmount.innerHTML = "bet: $0";
  rootDiv.appendChild(betAmount);

  const betHundredButton = document.createElement("button");
  betHundredButton.innerHTML = "$100";
  betHundredButton.setAttribute("id", "bet-hundred-button");
  rootDiv.appendChild(betHundredButton);

  let totalBet = 0;
  document
    .getElementById("bet-hundred-button")
    .addEventListener("click", function() {
      totalBet += game.player.placeBet(100);
      betAmount.innerHTML = `bet: $${totalBet}`;
      playerBank.innerHTML = `bank: $${game.player.bank}`;
    });

  const dealButton = document.createElement("button");
  dealButton.innerHTML = "deal";
  dealButton.setAttribute("id", "deal-button");
  rootDiv.appendChild(dealButton);

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
        return `${card.value} of ${card.suit}`;
      })}`;
      dealerScoreDiv.innerHTML = `dealer score: ${game.dealer.calculateScore()}`;
      dealerDiv.appendChild(dealerCardsDiv);
      dealerDiv.appendChild(dealerScoreDiv);
      rootDiv.appendChild(dealerDiv);

      const playerCardsDiv = document.createElement("div");
      const playerScoreDiv = document.createElement("div");
      playerCardsDiv.innerHTML = `player cards: ${game.player.hand.map(card => {
        return `${card.value} of ${card.suit}`;
      })}`;
      playerScoreDiv.innerHTML = `player score: ${game.player.calculateScore()}`;
      playerDiv.appendChild(playerCardsDiv);
      playerDiv.appendChild(playerScoreDiv);
      rootDiv.appendChild(playerDiv);

      const standButton = document.createElement("button");
      standButton.innerHTML = "stand";
      standButton.setAttribute("id", "stand-button");
      rootDiv.appendChild(standButton);

      const hitButton = document.createElement("button");
      hitButton.innerHTML = "hit";
      hitButton.setAttribute("id", "hit-button");
      rootDiv.appendChild(hitButton);

      document
        .getElementById("stand-button")
        .addEventListener("click", function() {
          game.player.stand();
          rootDiv.removeChild(document.getElementById("stand-button"));
          rootDiv.removeChild(document.getElementById("hit-button"));
        });

      document
        .getElementById("hit-button")
        .addEventListener("click", function() {
          game.player.hit();

          if (game.player.score > 21) {
            rootDiv.removeChild(document.getElementById("stand-button"));
            rootDiv.removeChild(document.getElementById("hit-button"));
          }

          console.log(game.player.playerTurn);

          const lastCard = game.player.hand[game.player.hand.length - 1];
          const playerNewCardNode = document.createTextNode(
            `,${lastCard.value} of ${lastCard.suit}`
          );
          playerCardsDiv.appendChild(playerNewCardNode);

          playerScoreDiv.innerHTML = `${game.player.calculateScore()}`;
        });
    }
  });
});
