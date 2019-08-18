class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = this.convertRankToValue(rank);
  }
  convertRankToValue(rank) {
    if (["J", "Q", "K"].includes(rank)) return 10;
    else if (rank === "A") return 11;
    else return +rank;
  }
}

export default Card;
