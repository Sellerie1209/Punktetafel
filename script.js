let pointsa = 0, pointsb = 0;
let setsa = 0, setsb = 0;
let flipped = false;
let gameend = false, roundend = false;
let gamemode, winpoints, winsets, palyablesets = 1;
let setsplayed = 0;

const teamA = document.getElementById("teamA");
const teamB = document.getElementById("teamB");
let leftTeam = teamA;

const pointhistory = document.getElementById("pointhistory");
const gamemodeselect = document.getElementById("gamemodeselect");

// Initial Setup
select();
updateSelectPosition();

function updateSelectPosition() {
    leftTeam.appendChild(gamemodeselect);
    gamemodeselect.style.position = "absolute";
    gamemodeselect.style.top = "0";
    gamemodeselect.style.left = "0";
    gamemodeselect.style.margin = "2rem";
}

function swapLeftTeam(newLeftTeam) {
    leftTeam = newLeftTeam;
    updateSelectPosition();
}

// Game Mode Setup
function select() {
    gamemode = gamemodeselect.value;
    switch (gamemode) {
        case "25": winpoints = 25; winsets = 1; palyablesets = 1; break;
        case "15": winpoints = 15; winsets = 1; palyablesets = 1; break;
        case "bo5": winpoints = 25; winsets = 3; palyablesets = 5; break;
        case "bo3": winpoints = 25; winsets = 2; palyablesets = 3; break;
    }
}

// Score Update
function add(team) {
    if (team === 1) {
        pointsa++;
        document.getElementById("btnteama").value = pointsa;
        if (pointsa >= winpoints && pointsa - pointsb >= 2) winset(1);
        else fillhistory();
    } else {
        pointsb++;
        document.getElementById("btnteamb").value = pointsb;
        if (pointsb >= winpoints && pointsb - pointsa >= 2) winset(2);
        else fillhistory();
    }
}

function subtract(team) {
    if (team === 1 && pointsa > 0) {
        pointsa--;
        document.getElementById("btnteama").value = pointsa;
    }
    if (team === 2 && pointsb > 0) {
        pointsb--;
        document.getElementById("btnteamb").value = pointsb;
    }
    removehistory();
}

// Point History
function fillhistory() {
    const score = document.createElement("p");
    score.textContent = scoreboard();
    pointhistory.prepend(score);

    if (pointhistory.childElementCount > 5) pointhistory.removeChild(pointhistory.lastElementChild);

    Array.from(pointhistory.children).forEach((el, i) => el.style.opacity = 1 - i * 0.2);
}

function removehistory() {
    if (pointhistory.firstChild) pointhistory.removeChild(pointhistory.firstChild);
    Array.from(pointhistory.children).forEach((el, i) => el.style.opacity = 1 - i * 0.1);
}

function scoreboard() {
    return flipped ? `${pointsb}:${pointsa}` : `${pointsa}:${pointsb}`;
}

// Set & Game Win
function winset(team) {
    if (team === 1) {
        if (winsets === 1) gamewon(1);
        else {
            setsa++;
            updateTeamName(1);
            setsa === winsets ? gamewon(1) : swapSidesAndRound(1);
        }
    } else {
        if (winsets === 1) gamewon(2);
        else {
            setsb++;
            updateTeamName(2);
            setsb === winsets ? gamewon(2) : swapSidesAndRound(2);
        }
    }
}

function updateTeamName(team) {
    if (team === 1) document.getElementById("teamnamea").textContent = `Team A Sets: ${setsa}`;
    else document.getElementById("teamnameb").textContent = `Team B Sets: ${setsb}`;
}

function swapSidesAndRound(team) {
    swapSides();
    roundwon(team);
}

function roundwon(team) {
    pointsa = 0; pointsb = 0;
    document.getElementById("btnteama").value = 0;
    document.getElementById("btnteamb").value = 0;

    setsplayed = setsa + setsb;
    if (setsplayed === palyablesets - 1) winpoints = 15;

    roundend = true;
    pointhistory.replaceChildren();
}

function gamewon(team) {
    roundwon(team);
    document.getElementById("teamnamea").textContent = team === 1 ? "Team A Won" : "Team A Lost";
    document.getElementById("teamnameb").textContent = team === 2 ? "Team B Won" : "Team B Lost";

    if (["bo5","bo3"].includes(gamemode) && flipped) swapSides();
    gameend = true;
    setsa = 0; setsb = 0;
    select();
}

// Sound
function whisle(id_sound) {
    const audio = document.getElementById(id_sound);
    audio.currentTime = 0;
    audio.play();

    if (roundend) {
        roundend = false;
        document.getElementById("teamnamea").textContent = `Team A Sets: ${setsa}`;
        document.getElementById("teamnameb").textContent = `Team B Sets: ${setsb}`;

        if (gameend) {
            gameend = false;
            document.getElementById("teamnamea").textContent = "Team A";
            document.getElementById("teamnameb").textContent = "Team B";
        }
    }
}

// Swap Sides
function swapSides() {
    const main = document.querySelector(".main");
    main.classList.toggle("flipped");

    if (!flipped) {
        swapLeftTeam(teamB);
        teamA.classList.replace("left","right");
        teamB.classList.replace("right","left");
        flipped = true;
    } else {
        swapLeftTeam(teamA);
        teamA.classList.replace("right","left");
        teamB.classList.replace("left","right");
        flipped = false;
    }
}

// Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") event.preventDefault();

    switch(event.key) {
        case "a": event.altKey || event.ctrlKey ? subtract(1) : add(1); break;
        case "b": event.altKey || event.ctrlKey ? subtract(2) : add(2); break;
        case " ": case "Enter": whisle("sound"); break;
        case "l": whisle("lizzard"); break;
    }
});
