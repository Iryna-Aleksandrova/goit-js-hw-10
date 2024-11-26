import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import iconReject from '../img/error.svg';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

button.disabled = true;

let userSelectedDate = '';

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      button.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
    } else {
      button.disabled = true;

      iziToast.error({
        iconUrl: iconReject,
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
        closeOnEscape: true,
      });
    }
  },
};

flatpickr(input, options);

const handleClickStart = () => {
  input.disabled = true;

  const timeinterval = setInterval(() => {
    if (userSelectedDate > 1000) {
      userSelectedDate -= 1000;

      const { days, hours, minutes, seconds } = convertMs(userSelectedDate);

      daysSpan.textContent = `${days}`.padStart(2, '0');
      hoursSpan.textContent = `${hours}`.padStart(2, '0');
      minutesSpan.textContent = `${minutes}`.padStart(2, '0');
      secondsSpan.textContent = `${seconds}`.padStart(2, '0');

      button.disabled = true;
    }

    if (userSelectedDate <= 1000) {
      clearInterval(timeinterval);
      input.disabled = false;
    }
  }, 1000);
};

button.addEventListener('click', handleClickStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
