let pointsa = 0;
let pointsb = 0;
let setsa = 0;
let setsb = 0;
let difference = 0;
let gameend = false;
let roundend = false;
let gamemode;
let winpoints;
let winsets;
let teamA = document.getElementById("teamA")
let teamB = document.getElementById("teamB")
let flipped = false;
let setsplayed = 0;
let palyablesets = 1;

select()

function select() {
    gamemode = document.getElementById("gamemodeselect").value
    switch (gamemode) {
        case "25":
            winpoints = 25;
            winsets = 1;
            palyablesets = 1;
            break;
        case "15":
            winpoints = 15;
            winsets = 1;
            palyablesets = 1;
            break;
        case "bo5":
            winpoints = 25;
            winsets = 3;
            palyablesets = 5;
            break;
        case "bo3":
            winpoints = 25;
            winsets = 2;
            palyablesets = 3;
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
                document.getElementById("teamnamea").textContent = "Team A"
                document.getElementById("teamnamea").textContent = document.getElementById("teamnamea").textContent + " Sets: " + setsa;
                if (setsa == winsets) {
                    gamewon(team);
                } else {
                    swapSides()
                    roundwon(team)
                }
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
                document.getElementById("teamnameb").textContent = "Team B"
                document.getElementById("teamnameb").textContent = document.getElementById("teamnameb").textContent + " Sets: " + setsb;
                if (setsb == winsets) {
                    gamewon(team);
                } else {
                    swapSides()
                    roundwon(team)
                }
                break;
        }
    }


}

function roundwon(team) {
    pointsa = 0;
    pointsb = 0;
    document.getElementById("btnteama").value = pointsa;
    document.getElementById("btnteamb").value = pointsb;

    setsplayed = setsa + setsb;
    if (setsplayed == palyablesets - 1) {
        winpoints = 15;
    }
    roundend = true;
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
    if (gamemode == "bo5" || gamemode == "bo3") {
        swapSides();
    }
    gameend = true;
    setsa = 0;
    setsb = 0;
    select();
}

function whisle(id_sound) {
    let audio = document.getElementById(id_sound);
    audio.currentTime = 0;
    audio.play();
    if (roundend == true) {
        roundend = false;
        document.getElementById("teamnamea").textContent = "Team A"
        document.getElementById("teamnamea").textContent = document.getElementById("teamnamea").textContent + " Sets: " + setsa;
        document.getElementById("teamnameb").textContent = "Team B"
        document.getElementById("teamnameb").textContent = document.getElementById("teamnameb").textContent + " Sets: " + setsb;

        if (gameend == true) {
            gameend = false;
            document.getElementById("teamnamea").textContent = "Team A"
            document.getElementById("teamnameb").textContent = "Team B"
        }
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

function swapSides() {
  // Richtung bestimmen
  if (!flipped) {
    teamA.style.transform = "translateX(100%)";
    teamB.style.transform = "translateX(-100%)";
  } else {
    teamA.style.transform = "translateX(-100%)";
    teamB.style.transform = "translateX(100%)";
  }

  // wenn die Animation fertig ist
  const onTransitionEnd = () => {
    teamA.removeEventListener("transitionend", onTransitionEnd);

    // Schritt 1: Reihenfolge wirklich ändern
    if (flipped) {
      teamA.style.order = "0";
      teamB.style.order = "1";
      flipped = false;
    } else {
      teamA.style.order = "2";
      teamB.style.order = "1";
      flipped = true;
    }

    // Schritt 2: damit sie nicht springen → Transform "beibehalten"
    teamA.style.transition = "none"; 
    teamB.style.transition = "none"; 

    // Werte aus der vorherigen Translation *stehen lassen*
    // und dann sofort auf 0 setzen (nächster Frame)
    requestAnimationFrame(() => {
      teamA.style.transform = "";
      teamB.style.transform = "";

      // Transition wieder aktivieren
      requestAnimationFrame(() => {
        teamA.style.transition = "transform 0.5s ease";
        teamB.style.transition = "transform 0.5s ease";
      });
    });
  };

  teamA.addEventListener("transitionend", onTransitionEnd);
}

document.addEventListener("keydown", function(event) {

    if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
    }

    switch(event.key) {
        case "a":
            if (event.altKey || event.ctrlKey) {
                subtract(1);
            } else {
                add(1)
            }
            break;

        case "b":
            if (event.altKey || event.ctrlKey) {
                subtract(2);
            } else {
                add(2)
            }
            break;

        case " ":
        case "Enter":
            
            whisle("sound");
            break;

        case "l":
            whisle("lizzard");
            break;
    }
});