import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let countdownInterval = null;
let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        console.log("Selected date:", userSelectedDate); // Перевірка

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight",
            });
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

startButton.addEventListener("click", () => {
    if (!userSelectedDate) return;

    startButton.disabled = true;
    datetimePicker.disabled = true;

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeDifference = userSelectedDate - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateTimerUI(0, 0, 0, 0);
            datetimePicker.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerUI(days, hours, minutes, seconds);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
        days: Math.floor(ms / day),
        hours: Math.floor((ms % day) / hour),
        minutes: Math.floor(((ms % day) % hour) / minute),
        seconds: Math.floor((((ms % day) % hour) % minute) / second),
    };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}
