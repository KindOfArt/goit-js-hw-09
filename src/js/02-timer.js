import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnRef = document.querySelector('[data-start]');
startBtnRef.disabled = true;

let isActive = false;
let intervalId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startBtnRef.disabled = true;
      return;
    }
    startBtnRef.addEventListener('click', () => {
      if (isActive) {
        return;
      }
      isActive = true;

      const futureTime = selectedDates[0].getTime();

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = futureTime - currentTime;
        const timeComponents = convertMs(deltaTime);

        if (deltaTime <= 0) {
          clearInterval(intervalId);
          isActive = false;
          return;
        }

        Object.entries(timeComponents).forEach(([name, value]) => {
          document.querySelector(`[data-${name}]`).textContent =
            addLeadingZero(value);
        });
      }, 1000);
    });

    startBtnRef.disabled = false;
  },
};

const flatpickr = new Flatpickr('#datetime-picker', options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
