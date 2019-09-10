export const updatePlayerCardsAndScore = ({
  game,
  firstPlayerCard,
  secondPlayerCard
}) => {
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
