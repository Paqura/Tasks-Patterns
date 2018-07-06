class Coffee {
  price () {
    return 5;
  }
}

const withSugar = drink => {
  const priceWithoutSugar = drink.price();
  drink.price = () => priceWithoutSugar + 1;
};

const withMilk = drink => {
  const priceWithoutSugar = drink.price();
  drink.price = () => priceWithoutSugar + 2;
}

const smallGlass = drink => {
  const priceWithoutSugar = drink.price();
  drink.price = () => priceWithoutSugar - 1;
};

const coffee = new Coffee();

withSugar(coffee);
withMilk(coffee);
smallGlass(coffee);

console.log(coffee.price());
