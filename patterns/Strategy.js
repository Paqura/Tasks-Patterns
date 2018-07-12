const pseudoNode = document.querySelector('#log');

const logger = (strategy, level, message, ...args) => {
  strategy(level, message, ...args);
};

const logToConsole = (level, message) => {
  console[level](message);
};

const logErrorToDOM = (level, message, node) => {
  node.innerHTML = `<span>${message}</span>`;
};

logger(
  logToConsole, 
  'log',
  'Blah blah blah',
  pseudoNode
);