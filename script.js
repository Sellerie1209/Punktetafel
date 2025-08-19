let pointsa = 0;
let pointsb = 0;
let setsa = 0;
let setsb = 0;
let difference = 0;
let gameend = false;
let gamemode;
let winpoints;
let winsets;
let teamA = document.getElementById("teamA")
let teamB = document.getElementById("teamB")
let flipped = false;

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
            winset(team)
        }
    }

    if (team == 2) {
        pointsb++;
        document.getElementById("btnteamb").value = pointsb;

        let difference = pointsb - pointsa;

        if (pointsb >= winpoints & difference >= 2) {
            winset(team);
        }
    }

}

function subtract(team) {
    if (team == 1) {
        if (pointsa > 0) {
            pointsa--;
            document.getElementById("btnteama").value = pointsa;
        }
    }
    if (team == 2) {
            if (pointsb > 0) {
            pointsb--;
            document.getElementById("btnteamb").value = pointsb;
        }
    }
}

function winset(team) {
    if (team == 1) {
        switch (winsets) {
            case 1:
                gamewon(team);
                break;
            case 2:
            case 3:
                setsa++;
                if (setsa == winsets) {
                    gamewon(team);
                } else {
                    order = teamA.style.order;              
                    if (flipped) {
                        teamA.style.order = "0";
                    } else {
                        teamA.style.order = "2";
                        flipped = true;
                    }
                    roundwon(team)
                }
                document.getElementById("teamnamea").textContent = "Team A"
                document.getElementById("teamnamea").textContent = document.getElementById("teamnamea").textContent + " Sets: " + setsa;
                break;
        }
    }

    if (team == 2) {
        switch (winsets) {
            case 1:
                gamewon(team);
                break;
            case 2:
            case 3:
                setsb++;
                if (setsb == winsets) {
                    gamewon(team);
                } else {
                    order = teamA.style.order;              
                    if (flipped) {
                        teamA.style.order = "0";
                        flipped = false;
                    } else {
                        teamA.style.order = "2";
                        flipped = true;
                    }
                    roundwon(team)
                }
                document.getElementById("teamnameb").textContent = "Team B"
                document.getElementById("teamnameb").textContent = document.getElementById("teamnameb").textContent + " Sets: " + setsb;
                console.log(setsb);
                break;
        }
    }

}

function roundwon(team) {
    pointsa = 0;
    pointsb = 0;
    document.getElementById("btnteama").value = pointsa;
    document.getElementById("btnteamb").value = pointsb;
    gameend = true;
}

function gamewon(team) {
    roundwon(team);
    if (team == 1) {
        document.getElementById("teamnamea").textContent = "Team A Won";
        document.getElementById("teamnameb").textContent = "Team B Lost";
    }   else {
        document.getElementById("teamnamea").textContent = "Team A Lost";
        document.getElementById("teamnameb").textContent = "Team B Won";
    }
    teamA.style.order = "0";
    setsa = 0;
    setsb = 0;
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