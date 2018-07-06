class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this
      .observers
      .filter(subscriber => subscriber !== fn);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

const observer = new Observer();

const field = document.querySelector('.text');
const counter = document.querySelector('.counter');
const lCounter = document.querySelector('.l-counter');

const getWordsCount = text => 
  text ? text.trim().split(/\s+/).length : 0;  

const getLettersCount = text => 
  text ? text.trim().split('').length : 0;  

observer.subscribe(text => {
  counter.textContent = getWordsCount(text);
  lCounter.textContent = getLettersCount(text);
});

field.addEventListener('keyup', evt => {
  observer.broadcast(evt.target.value);
});
