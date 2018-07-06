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

observer.subscribe(text => {
  counter.textContent = text ? 
    text.trim().split(/\s+/).length 
    : 0;  
});

field.addEventListener('keyup', evt => {
  observer.broadcast(evt.target.value);
});
