import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
input.value = '';
btn.disabled = true;
let userSelectedDate = null;
let currentTimerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btn.disabled = true;
      return;
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', () => {
  if (currentTimerId) {
    clearInterval(currentTimerId);
  }

  btn.disabled = true;
  input.disabled = true;

  currentTimerId = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = userSelectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(currentTimerId);
      currentTimerId = null;
      userSelectedDate = null;
      input.value = '';
      updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      btn.disabled = true;
      return;
    }

    const time = convertMs(remainingTime);
    updateInterface(time);
  }, 1000);
});

function updateInterface({
  days: dataDays,
  hours: dataHours,
  minutes: dataMinutes,
  seconds: dataSeconds,
}) {
  days.textContent = addLeadingZero(dataDays);
  hours.textContent = addLeadingZero(dataHours);
  minutes.textContent = addLeadingZero(dataMinutes);
  seconds.textContent = addLeadingZero(dataSeconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
