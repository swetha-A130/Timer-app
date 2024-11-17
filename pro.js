// Array to store all active timers
let timers = [];

// Function to start a new timer when the user clicks "Start Timer"
document.getElementById('start-timer').addEventListener('click', startTimer);

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Validate the input
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Convert the time to total seconds
    const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    createTimer(totalTimeInSeconds);
}

function createTimer(durationInSeconds) {
    let timeLeft = durationInSeconds;

    // Create a new timer object with a unique ID
    const timer = {
        id: Date.now(),
        intervalId: null,
        duration: timeLeft
    };

    // Add the timer to the array
    timers.push(timer);

    // Start the timer interval
    timer.intervalId = setInterval(() => {
        timeLeft--;
        timer.duration = timeLeft;
        renderTimers();  // Re-render the timers on every tick

        if (timeLeft <= 0) {
            clearInterval(timer.intervalId);  // Stop the timer when it reaches zero
            timerEnded(timer);  // Handle the timer end
        }
    }, 1000);

    // Re-render the timers after adding the new one
    renderTimers();
}

// Function to render the timers to the DOM
function renderTimers() {
    const activeTimersDisplay = document.getElementById('active-timers-display');
    activeTimersDisplay.innerHTML = '';  // Clear previous content

    // If no timers are active, show a message
    if (timers.length === 0) {
        activeTimersDisplay.innerHTML = '<p>You have no timers currently?</p>';
        return;
    }

    // Display the "Current Timers" heading
    const timersHeader = document.createElement('h2');
    
    
    timersHeader.style.color = 'white';
    activeTimersDisplay.appendChild(timersHeader);

    // Loop through the timers and render each one
    timers.forEach(timer => {
        const timerElement = document.createElement('div');
        timerElement.className = 'timer-element';

        timerElement.id = `timer-${timer.id}`;


        // If the timer has ended, show "Time Up!" in the same line as the "Delete" button
        // If the timer has ended, show "Time Up!" in the same line as the "Delete" button
if (timer.duration <= 0) {
    // Timer has ended
    timerElement.classList.add('timer-up');  // Add the timer-up class to the entire element
    timerElement.innerHTML = `
        <span class="timer-display">Timer is Up!</span>
        <button class="delete-btn" onclick="deleteTimer(${timer.id})">Stop</button>

    `;
    // Play the audio alert
    const audioAlert = document.getElementById('timer-alert');
    audioAlert.play(); // This plays the alert sound

}
else {
            // Timer is still counting down
            const hours = Math.floor(timer.duration / 3600);
            const minutes = Math.floor((timer.duration % 3600) / 60);
            const seconds = timer.duration % 60;
        
            const timeLeftText = ` ${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`;
            timerElement.innerHTML = `
                <span class="time-left"> Time Left : ${ timeLeftText  }</span>
                <button onclick="stopTimer(${timer.id}) "> Delete </button>
            `;
            
        }
        

        activeTimersDisplay.appendChild(timerElement);
    });
}

// Helper function to format the time with leading zeros
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Function to stop the timer manually (before it ends)
function stopTimer(id) {
    const timer = timers.find(t => t.id === id);
    clearInterval(timer.intervalId);  // Stop the interval
    timers = timers.filter(t => t.id !== id);  // Remove the timer from the list
    renderTimers();  // Re-render the active timers
}

// Function to delete the timer when it's finished
function deleteTimer(id) {
    timers = timers.filter(timer => timer.id !== id);
    renderTimers();  // Re-render the active timers
}

function playAlert() {
    const audio = document.getElementById('timer-alert');
    audio.play();
}
