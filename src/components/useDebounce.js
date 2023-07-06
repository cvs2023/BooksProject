export default function UseDebounce(callback, delay) {
  let timer;

  return function () {
    let cont = this;
    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(cont, args);
    }, delay);
  };
}
