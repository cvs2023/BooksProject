export default function UseDebounce(callback, delay) {
  let timer;

  return function () {
    let cont = this;
    let args = arguments;

    //It clears any existing timeout by calling clearTimeout(timer). This is done to ensure that only one timeout is active at a time.
    clearTimeout(timer);

    //It sets a new timeout using setTimeout. The provided delay is passed as the timeout duration
    timer = setTimeout(() => {
      callback.apply(cont, args);
      console.log("now works again");
    }, delay);
  };
}
