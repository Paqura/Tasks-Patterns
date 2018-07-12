class Singleton {
  static instance = null;

  constructor() {
    if(Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.counter = 0;    
  }

  getCounter() {
    return this.counter;
  }
  
  upCounter() {
    this.counter++;
  }
}

const s = new Singleton();
const s2 = new Singleton();

console.log(s === s2);

/**
 * Так же Singletone можно описать, как
 */

class Single {
  constructor() {
    if(!Single.instance) {
      this.data = [];
      Single.instance = this;
    }
    return Single.instance;
  }
  
  addItem(item) {
    this.data.push(item);
  }
  
  getData() {
    console.log(this.data);
  }
}

const s1 = new Single();
const s2 = new Single();

s2.addItem('hello');

console.log(s1, s2);
