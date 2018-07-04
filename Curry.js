/**
 * Представим, что у нас в html есть блок с классом box
 */

const box = document.querySelector('.box');

const curry = fn => {
  const arity = fn.length;
  
  return function f1(...args) {
    if(args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return function f2(...moreArgs) {
        const newArgs = args.concat(moreArgs);        
        return f1.apply(this, newArgs);
      }
    }
  }
}

const sum = (a, b) => {
  let s = a + b;
  box.textContent = s.toString();
}

const curried = curry(sum);

curried(2, 3);