let pointsa = 0;
let pointsb = 0;
let difference = 0;
let gameend = false;

function add(team) {
    if (team == 1) {
        pointsa++;
        document.getElementById("btnteama").value = pointsa;

        let difference = pointsa - pointsb;

        if (pointsa >= 15 & difference >= 2) {
            win(team)
        }
    }

    if (team == 2) {
        pointsb++;
        document.getElementById("btnteamb").value = pointsb;

        let difference = pointsb - pointsa;

        if (pointsb >= 15 & difference >= 2) {
            win(team);
        }
    }

}

function subtract(team) {
    if (team == 1) {
        pointsa--;
        document.getElementById("btnteama").value = pointsa;
    }

    if (team == 2) {
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
