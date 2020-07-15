const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ONE_DAY = 24 * 60 * 60; // seconds
const ONE_HOUR = 60 * 60;
const ONE_MINUTE = 60;
const ELEMS = document.querySelectorAll(".countdown h3");
const COUNTDOWN = document.querySelector(".countdown");

function zeroPad(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return String(num);
  }
}
function expandDate(date, days = 9, hours = 10, mins = 0, secs = 0) {
  date.setDate(date.getDate() + days);
  date.setHours(hours);
  date.setMinutes(mins);
  date.setSeconds(secs);
  return date;
}

let expireDate = expandDate(new Date());

const year = expireDate.getFullYear();
let month = expireDate.getMonth();
month = MONTHS[month];
const day = zeroPad(expireDate.getDate());
let weekday = expireDate.getDay();
weekday = WEEKDAYS[weekday];
const hours = zeroPad(expireDate.getHours());
const minutes = zeroPad(expireDate.getMinutes());
const seconds = zeroPad(expireDate.getSeconds());

const welcome = document.querySelector(".welcome");
welcome.innerHTML = `Our offer ends on <br/>${weekday}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;

const future = expireDate.getTime(); // ms

function getRemainingTime() {
  let now = new Date().getTime();
  let t = (future - now) / 1000; // seconds
  if (t <= 0) {
    clearInterval(interval_);
    COUNTDOWN.innerHTML =
      "<h3>The offer has expired! Good luck next time.</h3>";
  }

  let days = Math.floor(t / ONE_DAY);
  let hours = Math.floor((t % ONE_DAY) / ONE_HOUR);
  let minutes = Math.floor((t % ONE_HOUR) / ONE_MINUTE);
  let seconds = Math.floor(t % ONE_MINUTE);

  let values = [days, hours, minutes, seconds];
  values = values.map(zeroPad);

  ELEMS.forEach(function (elem, id) {
    elem.textContent = values[id];
  });
}

const interval_ = setInterval(getRemainingTime, 1000);
getRemainingTime();
