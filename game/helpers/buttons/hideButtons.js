export const hide = button => {
  document.getElementById(button).style.visibility = "hidden";
};

export const hideAllBets = () => {
  document.getElementById("bet-one-button").style.visibility = "hidden";
  document.getElementById("bet-five-button").style.visibility = "hidden";
  document.getElementById("bet-twenty-five-button").style.visibility = "hidden";
  document.getElementById("bet-hundred-button").style.visibility = "hidden";
  document.getElementById("bet-five-hundred-button").style.visibility =
    "hidden";
  document.getElementById("bet-thousand-button").style.visibility = "hidden";
};

export const hideAllActions = () => {
  document.getElementById("deal-button").style.visibility = "hidden";
  document.getElementById("stand-button").style.visibility = "hidden";
  document.getElementById("hit-button").style.visibility = "hidden";
  document.getElementById("new-game-button").style.visibility = "hidden";
};
