import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconResolve from '../img/ok.svg';
import iconReject from '../img/error.svg';

const form = document.querySelector('.form');
const inputDelay = document.querySelector("[name='delay']");
const inputFulfilled = document.querySelector("[value='fulfilled']");
const inputRejected = document.querySelector("[value='rejected']");
const button = document.querySelector('.form button');

form.addEventListener('submit', event => {
  event.preventDefault();
  const promise = inputDelayHandler();

  if (promise) {
    promise
      .then(delay => {
        iziToast.success({
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          iconUrl: iconResolve,
          backgroundColor: '#59A10D',
          iconColor: '#fff',
          imageWidth: 24,
          messageColor: '#fff',
          title: 'OK',
          titleColor: '#fff',
        });
        form.reset();
      })

      .catch(delay => {
        iziToast.error({
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          iconUrl: iconReject,
          backgroundColor: '#ef4040',
          iconColor: '#fff',
          imageWidth: 24,
          messageColor: '#fff',
          title: 'Error',
          titleColor: '#fff',
        });
        form.reset();
      });
  }
});

function inputDelayHandler() {
  const delay = Number(inputDelay.value);

  if (!isNaN(delay) && delay > 0) {
    const result = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inputFulfilled.checked) {
          resolve(delay);
        } else if (inputRejected.checked) {
          reject(delay);
        }
      }, delay);
    });
    return result;
  }
}
