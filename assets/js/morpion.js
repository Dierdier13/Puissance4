const startContainer = document.querySelector("#start");
const choiseContainer = document.getElementById("choise");
const factionContainer = document.getElementById("faction");
const gameContainer = document.getElementById("game");
const gameZoneContainer = document.getElementById("gameZone");
const playerOneContainer = document.getElementById("playerOne");
const playerTwoContainer = document.getElementById("playerTwo");
const restartContainer = document.getElementById("restart");
const winnerContainer = document.getElementById("winner");
const nulContainer = document.getElementById("nul");

const audio = new Audio("../assets/son/wow.mp3");
const audioA = new Audio("../assets/son/Ally.mp3");
const audioH = new Audio("../assets/son/Horde.mp3");
const audioW = new Audio("../assets/son/Warcraft.mp3");
let isAlly = false
let currentPlayer = 1;
let iaPlayer = false;
let tour = 1;
let grid = [
    ["", "", "",],
    ["", "", "",],
    ["", "", "",],
];



//////////////////////// Fonction reset grille //////////////

function resetGrid() {
    grid = [
        ["", "", "",],
        ["", "", "",],
        ["", "", "",],
    ];
}

/////////////////////////// Fonction choix pvp ou pvia ////////

function choiseAdversaire(choix) {
    choiseContainer.classList.add("hidden");
    factionContainer.classList.remove("hidden");
    if (choix == 1) {
        iaPlayer = false;
    } else {
        iaPlayer = true;
    }
}

////////////////////////// Choix de la Faction ///////////////

const allyImage = document.createElement('img');
allyImage.src = "../assets/images/ally.png";

const hordeImage = document.createElement('img');
hordeImage.src = "../assets/images/horde.png";

function ally() {
    factionContainer.classList.add("hidden");
    gameZoneContainer.classList.remove("hidden");
    restartContainer.classList.remove("hidden");
    playerOneContainer.appendChild(allyImage);
    playerTwoContainer.appendChild(hordeImage);
    createDimension();
    audio.pause();
    audioA.play();
    isAlly = true;
}

function horde() {
    factionContainer.classList.add("hidden");
    gameZoneContainer.classList.remove("hidden");
    restartContainer.classList.remove("hidden");
    playerOneContainer.appendChild(hordeImage);
    playerTwoContainer.appendChild(allyImage);
    createDimension();
    audio.pause();
    audioH.play();
    isAlly = false;
}

////////////////////////// Fonction restart ///////////////

function restartGame() {
    choiseContainer.classList.remove("hidden");
    restartContainer.classList.add("hidden");
    gameZoneContainer.classList.add("hidden");
    winnerContainer.classList.add("hidden");
    nulContainer.classList.add("hidden");
    tour = 1;
    currentPlayer = 1;
    resetGrid();
    audioA.pause()
    audioH.pause()
    audioW.play();
}


////////////////////////// Fonction Déroulement du jeux ///////////////

function gameProgress(i, j) {
    if (grid[i][j] === "") {
        grid[i][j] = currentPlayer;
        checkWin(grid);
        tour++;
        tourParTour();
        createDimension();
    }
}

////////////////////////// Création gille ///////////////////

function createDimension() {
    gameContainer.textContent = ""
    for (let i = 0; i < grid.length; i++) {
        let rowgrid = grid[i];
        for (let j = 0; j < rowgrid.length; j++) {
            let gridGame = document.createElement("div")
            gameContainer.appendChild(gridGame);
            if (grid[i][j] === "" && !(iaPlayer && currentPlayer == 2)) {
                gridGame.addEventListener("click", () => {
                    gameProgress(i, j)
                });
            }
            if (isAlly) {
                switch (grid[i][j]) {
                    case 1:
                        let pionAlly = document.createElement("img");
                        pionAlly.src = "../assets/images/pion-ally2.png";
                        gridGame.appendChild(pionAlly);
                        break;

                    case 2:
                        let pionHorde = document.createElement("img");
                        pionHorde.src = "../assets/images/pion-horde2.png";
                        gridGame.appendChild(pionHorde);
                        break;

                    default:
                        break;
                }
            } else {
                switch (grid[i][j]) {
                    case 1:
                        let pionHorde = document.createElement("img");
                        pionHorde.src = "../assets/images/pion-horde2.png";
                        gridGame.appendChild(pionHorde);
                        break;

                    case 2:
                        let pionAlly = document.createElement("img");
                        pionAlly.src = "../assets/images/pion-ally2.png";
                        gridGame.appendChild(pionAlly);
                        break;

                    default:
                        break;
                }
            }
        }
    }
}

//////////////////////////// Fonction tour par tour //////////////////

function tourParTour() {
    if (!checkWin(grid)) {
        currentPlayer = tour % 2 === 1 ? 1 : 2;
        if (iaPlayer && currentPlayer === 2) {
            setTimeout(iaPlay, 500);
        }
    }
}

////////////////////////////// Fonction iaPlay ///////////////////

function iaPlay() {
    let possibleChoise = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "") {
                possibleChoise.push({ i, j });
            }
        }
    }

    if (possibleChoise.length > 0) {
        const move = possibleChoise[random(0, possibleChoise.length - 1)];
        grid[move.i][move.j] = currentPlayer;
        checkWin(grid);
        tour++;
        tourParTour();
        createDimension();
    }
}

////////////////////////////// Fonction check win ////////////////

function checkWin(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {

            if (grid[i][j] !== "" && grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 2] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 2] && grid[i + 2][j + 2] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j + 1] && grid[i][j] === grid[i + 2][j + 2]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 2] && grid[i + 2][j - 2] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j - 1] && grid[i][j] === grid[i + 2][j - 2]) {
                displayWinner(currentPlayer);
                return true;
            }
        }
    }
    // Vérification du match nul
    if (grid.flat().every(cell => cell !== "")) {
        displayDraw();
        return true;
    }
    return false; // La partie continue
}

//////////////////////////// Afficher le gagnant /////////////////////////

function displayWinner(player) {
    if (player === 1) {
        if (isAlly) {
            winnerContainer.classList.remove("hidden");
            winnerContainer.innerHTML = "<img src='../assets/images/ally.png' alt='gagnant'> L'Alliance a gagné !";
        } else {
            winnerContainer.classList.remove("hidden");
            winnerContainer.innerHTML = "<img src='../assets/images/horde.png' alt='gagnant'> La Horde a gagné !";
        }
    } else {
        if (isAlly) {
            winnerContainer.classList.remove("hidden");
            winnerContainer.innerHTML = "<img src='../assets/images/horde.png' alt='gagnant'> La Horde a gagné !";
        } else {
            winnerContainer.classList.remove("hidden");
            winnerContainer.innerHTML = "<img src='../assets/images/ally.png' alt='gagnant'> L'Alliance a gagné !";
        }
    }
    gameZoneContainer.classList.add("hidden");
}

//////////////////////////// Afficher match nul /////////////////////////

function displayDraw() {
    nulContainer.classList.remove("hidden");
    nulContainer.textContent = "Match nul !";
    gameContainer.classList.add("hidden");
}

//////////////////////////////// Fonction randaom ////////////////////

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}