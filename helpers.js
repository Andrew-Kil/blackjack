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

export const createBetHundredButton = rootElement => {
  const betHundredButton = buttonMaker("$100", "bet-hundred");
  rootElement.appendChild(betHundredButton);
};

export const createHitButton = rootElement => {
  const hitButton = buttonMaker("hit");
  rootElement.appendChild(hitButton);
};

export const createNewGameButton = rootElement => {
  const newGameButton = buttonMaker("new-game");
  rootElement.appendChild(newGameButton);
};

export const disableButton = button => {
  document.getElementById(button).disabled = true;
};

export const enableButton = button => {
  document.getElementById(button).disabled = false;
};
