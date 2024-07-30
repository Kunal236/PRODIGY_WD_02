let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerText = 'Pause';
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = 'Start';
        lapBtn.disabled = true;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerText = '00:00:00';
    startStopBtn.innerText = 'Start';
    lapBtn.disabled = true;
    laps.innerHTML = '';
    lapCounter = 1;
});

lapBtn.addEventListener('click', function() {
    const li = document.createElement('li');
    li.innerText = `Lap ${lapCounter}: ${display.innerText}`;
    laps.appendChild(li);
    lapCounter++;
});

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    display.innerText = hours + ':' + minutes + ':' + seconds;
}
