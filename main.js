const stopWatchDisplay = document.querySelector("#stopWatchDisplay");
const countdownDisplay = document.querySelector("#countdownDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const startTimerBtn = document.querySelector("#startTimerBtn");
const resetTimerBtn = document.querySelector("#resetTimerBtn");
const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const countdownElement = document.getElementById("countdownDisplay");


let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let sec = 0;

let alarm = new Audio("Alarm/Voicy_Alarm Alarm!.mp3")

// startBtn.addEventListener("click", () => {
//     if (paused){
//         paused = false;
//         startTime = Date.now() - elapsedTime;
//         intervalId = setInterval(updateTime, 1000)
//     }
// });
startBtn.addEventListener("click", () => {
    if (paused){
        if (isCountdownMode()) {
            startCountdown();
        } else {
            startStopwatch();
        }
    }
});
pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    sec = 0;
    stopWatchDisplay.textContent = "00:00:00";
});

startTimerBtn.addEventListener("click", () => {
    if (paused) {
        startCountdown();
    }
});

function startStopwatch() {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
}

function startCountdown() {
    const countdownTime = getUserInputTime();
    if (countdownTime > 0) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        currentTime = countdownTime;
        intervalId = setInterval(updateCountdownTime, 1000);
    }
}

resetTimerBtn.addEventListener("click", () => {
    resetCountdown();
});

function resetCountdown() {
    paused = true;
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    clearInterval(intervalId);
    updateDisplay();
    
}

function updateCountdownTime() {
    elapsedTime = Date.now() - startTime;
    currentTime = Math.max(currentTime - 1000, 0);

    sec = Math.floor((currentTime / 1000) % 60);
    mins = Math.floor((currentTime / (1000 * 60)) % 60);
    hrs = Math.floor((currentTime / (1000 * 60 * 60)) % 60);

    sec = pad(sec);
    mins = pad(mins);
    hrs = pad(hrs);

    countdownDisplay.textContent = `${hrs}:${mins}:${sec}`;

    if (currentTime === 0) {
        paused = true;
        clearInterval(intervalId);
        alarm.play();
        countdownElement.classList.add('alarm-animation');
        setTimeout(() => {
            countdownElement.classList.remove('alarm-animation');
          }, 4000);
    }
}

function updateDisplay() {
    sec = Math.floor((currentTime / 1000) % 60);
    mins = Math.floor((currentTime / (1000 * 60)) % 60);
    hrs = Math.floor((currentTime / (1000 * 60 * 60)) % 60);

    sec = pad(sec);
    mins = pad(mins);
    hrs = pad(hrs);

    countdownDisplay.textContent = `${hrs}:${mins}:${sec}`;
}

function updateTime(){
    elapsedTime = Date.now() - startTime;

    sec = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    sec = pad(sec);
    mins = pad(mins);
    hrs = pad(hrs);

    // timeDispaly.textContent = formatTime(hrs, mins, sec);
    stopWatchDisplay.textContent = `${hrs}:${mins}:${sec}`;
    // function pad(unit) {
    //     return (("0") + unit).length > 2 ? unit : "0" + unit;
    // }
}
function pad(unit) {
    return (("0") + unit).slice(-2);
}

function getUserInputTime() {
    const hours = parseInt(document.getElementById("hoursInput").value, 10);
    const minutes = parseInt(document.getElementById("minutesInput").value, 10);
    const seconds = parseInt(document.getElementById("secondsInput").value, 10);

    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000; // Convert to milliseconds
}

function isCountdownMode() {
    const countdownTab = document.getElementById("countdown");
    return countdownTab.style.display === "block";
}

function formatTime(hrs, mins, sec) {
    return `${pad(hrs)}:${pad(mins)}:${pad(sec)}`;
}

setInterval(setClock, 1000)

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360)
}

setClock()



function openPage(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

document.getElementById("leftTab").click();



