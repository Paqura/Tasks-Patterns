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
