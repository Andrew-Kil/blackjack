export const disable = button => {
  document.getElementById(button).disabled = true;
};

export const enable = button => {
  document.getElementById(button).disabled = false;
};

export const disableAllBets = () => {
  document.getElementById("bet-one-button").disabled = true;
  document.getElementById("bet-five-button").disabled = true;
  document.getElementById("bet-twenty-five-button").disabled = true;
  document.getElementById("bet-hundred-button").disabled = true;
  document.getElementById("bet-five-hundred-button").disabled = true;
  document.getElementById("bet-thousand-button").disabled = true;
};

export const disableAllActions = () => {
  document.getElementById("deal-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  document.getElementById("hit-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
};

export const enableAllBets = () => {
  document.getElementById("bet-one-button").disabled = false;
  document.getElementById("bet-five-button").disabled = false;
  document.getElementById("bet-twenty-five-button").disabled = false;
  document.getElementById("bet-hundred-button").disabled = false;
  document.getElementById("bet-five-hundred-button").disabled = false;
  document.getElementById("bet-thousand-button").disabled = false;
};
