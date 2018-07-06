class Singleton {
  static instance = null;

  constructor() {
    if(Singleton.instance) {
      return this;
    }
    this.counter = 0;    
  }

  getCounter() {
    return this.counter;
  }

  upCounter() {
    this.counter++;
  }
}

