import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const elements = e.target.elements;
  const amountValue = elements.amount.value;
  let delayValue = Number(elements.delay.value);
  let stepValue = Number(elements.step.value);
  let promisePosition = 0;

  for (let i = 0; i < amountValue; i += 1) {
    promisePosition += 1;

    delayValue += stepValue;

    createPromise(promisePosition, delayValue)
      .then(successMessage => {
        Notify.success(successMessage);
      })
      .catch(rejectMessage => {
        Notify.failure(rejectMessage);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`Fulfill promise ${position} in ${delay}`);
      } else {
        reject(`Reject promise ${position} in ${delay}`);
      }
      promiseCounter = 0;
    }, delay);
  });
}
