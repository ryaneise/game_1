let score = 0;

const scoreDisplay = document.getElementById("score");
const gameButton = document.getElementById("gameButton");
const message = document.getElementById("message");

gameButton.addEventListener("click", function () {
    score++;

    scoreDisplay.textContent = score;

    message.textContent =
        "Nice! Keep clicking!";
});
