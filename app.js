const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const resetBtn = document.querySelector(".resetBtn");
const pomoCountsDisplay = document.querySelector(".pomoCountsDisplay");

// making Variables
const workTime = 25*60;
const breakTime = 5*60;
let timerID = null;
let oneRoundCompleted = false; //One round = Work time + Break time
let totalCount = 0;
let paused = false;

// function to upadate title
const updateTitle = (msg) => {
    title.textContent = msg;
}

// function to save pomodoro counts to local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts",JSON.stringify(counts));
}

// function to countDown
const countDown=(time) =>{
    return()=>{
        const mins  = Math.floor(time / 60).toString().padStart(2,'0');
        const secs = Math.floor(time % 60).toString().padStart(2,'0');;
        timer.textContent = `${mins}:${secs}`;
    time--;
    if(time < 0){
        stopTimer();
        if(!oneRoundCompleted){
            timerID = startTimer(breakTime);
            oneRoundCompleted = true;
            updateTitle("It's Break Time!");
        }
        else{
            updateTitle("Completed 1 Roound of Promodoro Technique!");
            setTimeout(() => updateTitle("Start timer again!"), 2000);
            totalCount++;
            saveLocalCounts();
            showPomoCounts();
        }
       
    }
    }    
}

// Arrow Function to startTimer
const startTimer = (startTime) => {
    if(timerID !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime),1000);
}

// Arrow Function to stopTimer
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

// function to get time in seconds
const getTimeInSeconds = (timeString) =>{
    const[minutes,seconds] = timeString.split(":");
    return parseInt(minutes * 60) + parseInt(seconds);

}
// Adding event listener to start Button
startBtn.addEventListener('click', ()=>{
    timerID = startTimer(workTime);
    updateTitle("It's Work Time!");
});

// Adding event listener to reset Button
resetBtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent ="25:00";
});


// Adding event listener to pause Button
pauseBtn.addEventListener('click', () => {
    stopTimer();
    paused = true;
    updateTitle("Timer paused");
});

// Adding event listener to resume Button
resumeBtn.addEventListener('click', () => {
   if(paused){
    const currentTime = getTimeInSeconds(timer.textContent);
    timerID = startTimer(currentTime);
    paused = false;
    (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time");
   }
});

// function to show completed pomodoros to screen from local storage
const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if(counts < 0){
        pomoCountsDisplay.style.display = "flex";
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}
showPomoCounts();