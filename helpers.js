const buttonMaker = (label, id = label) => {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.setAttribute("id", `${id}-button`);
  return button;
};

export const createStartButton = rootElement => {
  const startButton = buttonMaker("start");
  rootElement.appendChild(startButton);
};

export const createDealButton = rootElement => {
  const dealButton = buttonMaker("deal");
  rootElement.appendChild(dealButton);
};

export const createStandButton = rootElement => {
  const standButton = buttonMaker("stand");
  rootElement.appendChild(standButton);
};

export const createBetOneButton = rootElement => {
  const betHundredButton = buttonMaker("$1", "bet-one");
  rootElement.appendChild(betHundredButton);
};

export const createBetFiveButton = rootElement => {
  const betFiveButton = buttonMaker("$5", "bet-five");
  rootElement.appendChild(betFiveButton);
};

export const createBetTwentyFiveButton = rootElement => {
  const betTwentyFiveButton = buttonMaker("$25", "bet-twenty-five");
  rootElement.appendChild(betTwentyFiveButton);
};

export const createBetHundredButton = rootElement => {
  const betHundredButton = buttonMaker("$100", "bet-hundred");
  rootElement.appendChild(betHundredButton);
};

export const createBetFiveHundredButton = rootElement => {
  const betFiveHundredButton = buttonMaker("$500", "bet-five-hundred");
  rootElement.appendChild(betFiveHundredButton);
};

export const createBetThousandButton = rootElement => {
  const betThousandButton = buttonMaker("$1000", "bet-thousand");
  rootElement.appendChild(betThousandButton);
};

export const createHitButton = rootElement => {
  const hitButton = buttonMaker("hit");
  rootElement.appendChild(hitButton);
};

export const createNewGameButton = rootElement => {
  const newGameButton = buttonMaker("new-game");
  rootElement.appendChild(newGameButton);
};

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

export const enableAllBets = () => {
  document.getElementById("bet-one-button").disabled = false;
  document.getElementById("bet-five-button").disabled = false;
  document.getElementById("bet-twenty-five-button").disabled = false;
  document.getElementById("bet-hundred-button").disabled = false;
  document.getElementById("bet-five-hundred-button").disabled = false;
  document.getElementById("bet-thousand-button").disabled = false;
};
