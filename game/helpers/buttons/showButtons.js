export const show = button => {
  document.getElementById(button).style.visibility = "visible";
};

export const showAllBets = () => {
  document.getElementById("bet-one-button").style.visibility = "visible";
  document.getElementById("bet-five-button").style.visibility = "visible";
  document.getElementById("bet-twenty-five-button").style.visibility =
    "visible";
  document.getElementById("bet-hundred-button").style.visibility = "visible";
  document.getElementById("bet-five-hundred-button").style.visibility =
    "visible";
  document.getElementById("bet-thousand-button").style.visibility = "visible";
};
