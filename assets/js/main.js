const startContainer = document.querySelector("#start");
const choiseContainer = document.getElementById("choise");

const audioW = new Audio("assets/son/Warcraft.mp3");


function startGame() {
    startContainer.classList.add("hidden");
    choiseContainer.classList.remove("hidden");
    audioW.play();
    resetGrid();
}
