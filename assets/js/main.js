const startContainer = document.querySelector("#start");
const choiseContainer = document.getElementById("choise");
const factionContainer = document.getElementById("faction");
const gameContainer = document.getElementById("game");
const restartContainer = document.getElementById("restart");
const winnerContainer = document.getElementById("winner");
const nulContainer = document.getElementById("nul");

const audio = new Audio("assets/son/wow.mp3");
const audioA = new Audio("assets/son/Ally.mp3");
const audioH = new Audio("assets/son/Horde.mp3");
const audioW = new Audio("assets/son/Warcraft.mp3");
let isAlly = false
let currentPlayer = 1;
let iaPlayer = false;
let tour = 1;
let grid = [
    ["", "", "", "", "", "",],
    ["", "", "", "", "", "",],
    ["", "", "", "", "", "",],
    ["", "", "", "", "", "",],
    ["", "", "", "", "", "",],
    ["", "", "", "", "", "",],
];



//////////////////////// Fonction reset grille //////////////

function resetGrid() {
    grid = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];
}

//////////////////////// Fonction Start Game //////////////

function startGame() {
    startContainer.classList.add("hidden");
    choiseContainer.classList.remove("hidden");
    audio.play();
    resetGrid();
    
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

const ally = document.createElement("img");
ally.src = "./assets/images/ally.png";
factionContainer.appendChild(ally);
ally.addEventListener("click", () => {
    factionContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    restartContainer.classList.remove("hidden");
    createDimension();
    audio.pause();
    audioA.play();
    isAlly = true;
});

const horde = document.createElement("img");
horde.src = "./assets/images/horde.png";
factionContainer.appendChild(horde);
horde.addEventListener("click", () => {
    factionContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    restartContainer.classList.remove("hidden");
    createDimension();
    audio.pause();
    audioH.play();
    isAlly = false;
});

////////////////////////// Fonction restart ///////////////

function restartGame() {
    startContainer.classList.remove("hidden");
    restartContainer.classList.add("hidden");
    gameContainer.classList.add("hidden");
    winnerContainer.classList.add("hidden");
    nulContainer.classList.add("hidden");
    tour = 1;
    currentPlayer = 1;
    resetGrid();
    audioA.pause()
    audioH.pause()
    audioW.play();
    // clearInterval(moveDownPion);
}

////////////////////////// Fonction Déroulement du jeux ///////////////

function gameProgress(i, j) {
    if (grid[i][j] === "") {
        grid[i][j] = currentPlayer;
        createDimension()
        moveDownPion(i, j);  
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
            if (i === 0 && grid[i][j] === "" && !(iaPlayer && currentPlayer == 2)) {  // condition que la 1ere ligne cliquable
                gridGame.addEventListener("click", () => {
                    gameProgress(i, j)
                });
            }
            if (isAlly) {
                switch (grid[i][j]) {
                    case 1:
                        let pionAlly = document.createElement("img");
                        pionAlly.src = "./assets/images/pion-ally.png";
                        gridGame.appendChild(pionAlly);
                        break;

                    case 2:
                        let pionHorde = document.createElement("img");
                        pionHorde.src = "./assets/images/pion-horde.png";
                        gridGame.appendChild(pionHorde);
                        break;

                    default:
                        break;
                }
            } else {
                switch (grid[i][j]) {
                    case 1:
                        let pionHorde = document.createElement("img");
                        pionHorde.src = "./assets/images/pion-horde.png";
                        gridGame.appendChild(pionHorde);
                        break;

                    case 2:
                        let pionAlly = document.createElement("img");
                        pionAlly.src = "./assets/images/pion-ally.png";
                        gridGame.appendChild(pionAlly);
                        break;

                    default:
                        break;
                }
            }
        }
    }
}

///////////////////////////// Fonction déplacement vers le bas /////////////////

function moveDownPion(line, column) {
    const player = currentPlayer
    const yolo = setInterval(()=>{
        if(line<grid.length-1 && grid[line+1][column] === ""){
                grid[line][column] = ""
                grid[line+1][column] = player
                line++
                createDimension()
        }
        else {
            checkWin(grid);
            tour++
            tourParTour()
            clearInterval(yolo)
        }
    }, 100)
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
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[0][j] === "") {
            possibleChoise.push({ j });
        }
    }
    if (possibleChoise.length > 0) {
        const move = possibleChoise[random(0, possibleChoise.length - 1)];
        grid[0][move.j] = currentPlayer;
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

            if (grid[i][j] !== "" && grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2] && grid[i][j] === grid[i][j + 3]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 3] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j] && grid[i][j] === grid[i + 3][j]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 3] && grid[i + 3][j + 3] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j + 1] && grid[i][j] === grid[i + 2][j + 2] && grid[i][j] === grid[i + 3][j + 3]) {
                displayWinner(currentPlayer);
                return true;
            }
            if (grid[i + 3] && grid[i + 3][j - 3] && grid[i][j] !== "" && grid[i][j] === grid[i + 1][j - 1] && grid[i][j] === grid[i + 2][j - 2] && grid[i][j] === grid[i + 3][j - 3]) {
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
    const factionName = (player === 1) === isAlly ? "L'Alliance" : "La Horde";
    winnerContainer.classList.remove("hidden");
    winnerContainer.textContent = factionName + " a gagné !";
    gameContainer.classList.add("hidden");
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