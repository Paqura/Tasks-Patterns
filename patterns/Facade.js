const Valera = {
  name: 'Valera',
  balance: 1000,
  history : true
};

const Semen = {
  name: 'Semen',
  balance: -1000,
  history : false
};

class Bank {
  balance (amount) {
    return amount > 0;
  }
}

class CreditHistory {
  check (history) {
    if(history) {
      return true;
    }
    return false;
  }
}

class Credit {
  constructor(user) {
    this.name = user.name;
    this.history = user.history;
    this.balance = user.balance;
  }

  applyFor(amout) {
    const isPositiveBalance = new Bank().balance(this.balance) ? 'положительный' : 'отрицательный';
    const creditHistory = new CreditHistory().check(this.history) ? 'одобрен' : 'не одобрен';
    return `Добрый день, ${this.name}, у вас ${isPositiveBalance} баланс и поэтому ваш кредит ${creditHistory}`;
  }
}

const valeraCredit = new Credit(Valera).applyFor(999);
const semenCredit = new Credit(Semen).applyFor(999);

console.log(valeraCredit);
console.log(semenCredit);


