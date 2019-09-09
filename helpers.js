export const disable = button => {
  document.getElementById(button).style.visibility = "hidden";
};

export const enable = button => {
  document.getElementById(button).style.visibility = "visible";
};

export const disableAllBets = () => {
  document.getElementById("bet-one-button").style.visibility = "hidden";
  document.getElementById("bet-five-button").style.visibility = "hidden";
  document.getElementById("bet-twenty-five-button").style.visibility = "hidden";
  document.getElementById("bet-hundred-button").style.visibility = "hidden";
  document.getElementById("bet-five-hundred-button").style.visibility =
    "hidden";
  document.getElementById("bet-thousand-button").style.visibility = "hidden";
};

export const disableAllActions = () => {
  document.getElementById("deal-button").style.visibility = "hidden";
  document.getElementById("stand-button").style.visibility = "hidden";
  document.getElementById("hit-button").style.visibility = "hidden";
  document.getElementById("new-game-button").style.visibility = "hidden";
};

export const enableAllBets = () => {
  document.getElementById("bet-one-button").style.visibility = "visible";
  document.getElementById("bet-five-button").style.visibility = "visible";
  document.getElementById("bet-twenty-five-button").style.visibility =
    "visible";
  document.getElementById("bet-hundred-button").style.visibility = "visible";
  document.getElementById("bet-five-hundred-button").style.visibility =
    "visible";
  document.getElementById("bet-thousand-button").style.visibility = "visible";
};
