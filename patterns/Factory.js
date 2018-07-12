class Product { 
  create(name) {
    let product;

    switch(name) {
      case 'milk': 
        product = new Milk();
        break;
      case 'water': 
        product = new Water(); 
        break;  
      case 'beer': 
        product = new Beer();
        break;
      default: break;            
    }   

    product.say = function() {
      return this.name;
    }

    return product;
  }
}

class Milk {
  constructor() {
    this.name = 'Молоко';
  }
}

class Water {
  constructor() {
    this.name = 'Вода';
  }
}

class Beer {
  constructor() {
    this.name = 'Пиво';
  }
}

const productFactory = new Product();

const milk = productFactory.create('milk');
const water = productFactory.create('water');
const beer = productFactory.create('beer');

console.log(milk.say());
console.log(water.say());
console.log(beer.say());
