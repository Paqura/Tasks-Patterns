const debounce = (fn, ms) => {
  let timer = null;

  return function(...args) {
    const onComplete = () => {
      fn.apply(this, args);
      timer = null;
    }

    if(!timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  }
}

const sayHello = () => console.log('Hello!');

const debounced = debounce(sayHello, 2000);

debounced();