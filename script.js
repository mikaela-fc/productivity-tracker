let startTime = null;
let interval = null; 

/*Starts the timer*/
function startTimer() {
    if (interval) return; //prevents multiple timers

    startTime = Date.now();

    //Updates UI to reflect seconds passed
    interval = setInterval(() => {
        const now = Date.now();

        // calculates the number of seconds that has passed
        const seconds = Math.floor((now - startTime)/1000); // because Date.now() returns milliseconds
        
        // replaces item in the id="timer" with the variable
        document.getElementById("timer").textContent = seconds;
    }, 1000);
}

/*Ends the timer*/
function stopTimer() {
    if (!startTime) return;

    clearInterval(interval);
    interval = null;

    const endTime = Date.now();

    // calculate the total study duration
    const duration = Math.floor((endTime - startTime)/1000);
    startTime = null;

    document.getElementById("timer").textContent = "0"; // resets timer

    if (duration>0) saveSession(duration);
}

/* keeps track of sessions */
function saveSession(duration){
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.push(duration);
    localStorage.setItem("sessions", JSON.stringify(sessions));
    displaySessions();
}

/* shows past sessions, if exists*/
function displaySessions() {
    const list = document.getElementById("sessions");
    list.innerHTML = "";

    // gets the past sessions, if exists
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.forEach((s, index) => {
        const div = document.createElement("div");

        // Session names
        const seshCount = document.createElement("span");
        seshCount.textContent = `Session ${index}`;

        // Session durations
        const timeText = document.createElement("span");
        const min = Math.floor(s/60);
        const sec = s % 60;
        timeText.textContent = `${min} minutes, ${sec} seconds`;
        

        // adds a delete session function
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => {
            sessions.splice(index, 1);
            localStorage.setItem("sessions", JSON.stringify(sessions));
            displaySessions();
        }
        div.appendChild(seshCount);
        div.appendChild(timeText);
        div.appendChild(btn);
        list.appendChild(div);
    });
}

function clearAll() {
    localStorage.setItem("sessions", []);
    displaySessions();
}

displaySessions();