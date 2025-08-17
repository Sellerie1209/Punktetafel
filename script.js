let pointsa = 0;
let pointsb = 0;
let difference = 0;
let gameend = false;
let gamemode;
let winpoints;
let winsets;

select()

function select() {
    gamemode = document.getElementById("gamemodeselect").value
    switch (gamemode) {
        case "25":
            winpoints = 25;
            winsets = 1;
            break;
        case "15":
            winpoints = 15;
            winsets = 1;
            break;
        case "bo5":
            winpoints = 25;
            winsets = 3;
            break;
        case "bo3":
            winpoints = 25;
            winsets = 2;
            break;
    }
}

function add(team) {
    if (team == 1) {
        pointsa++;
        document.getElementById("btnteama").value = pointsa;

        let difference = pointsa - pointsb;

        if (pointsa >= winpoints & difference >= 2) {
            win(team)
        }
    }

    if (team == 2) {
        pointsb++;
        document.getElementById("btnteamb").value = pointsb;

        let difference = pointsb - pointsa;

        if (pointsb >= winpoints & difference >= 2) {
            win(team);
        }
    }

}

function subtract(team) {
    if (team == a) {
        pointsa--;
        document.getElementById("btnteama").value = pointsa;
    }

    if (team == b) {
        pointsb--;
        document.getElementById("btnteamb").value = pointsb;
    }
}

function win(team) {
    pointsa = 0;
    pointsb = 0;
    document.getElementById("btnteama").value = pointsa;
    document.getElementById("btnteamb").value = pointsb;
    if (team == 1) {
        document.getElementById("teamnamea").textContent = "Team A Won";
        document.getElementById("teamnameb").textContent = "Team B Lost";
    }

    if (team == 2) {
        document.getElementById("teamnameb").textContent = "Team B Won";
        document.getElementById("teamnamea").textContent = "Team A Lost";
    }
    gameend = true;
}

function whisle() {
    let audio = document.getElementById("sound");
    audio.currentTime = 0;
    audio.play();

    if (gameend == true) {
        gameend = false;
        document.getElementById("teamnamea").textContent = "Team A";
        document.getElementById("teamnameb").textContent = "Team B";
    }
}

const innen = document.getElementById("teamA");
const gamemodeselect = document.getElementById("gamemodeselect");

function updatePos() {
      const rect = innen.getBoundingClientRect();
      gamemodeselect.style.left = rect.left + window.scrollX + "px";
      gamemodeselect.style.top = rect.top + window.scrollY + "px";
    }

updatePos();
window.addEventListener("resize", updatePos);
window.addEventListener("scroll", updatePos);