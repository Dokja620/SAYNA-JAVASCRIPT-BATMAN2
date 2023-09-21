// some global vars that we'll use later
    const startContainer = document.getElementById("start-container");
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const questionCounter = document.getElementById("question-counter");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupCloseButton = document.getElementById("popup-close-button");
    const congratulationPopup = document.getElementById("congratulation-popup");
    const showScoreboardButton = document.getElementById("show-scoreboard-button");
    const scoreboard = document.getElementById("scoreboard");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restart-button");
    
// Init vars
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswerIndex = -1;
let score = 0;

// The quizz
    function startGame() {
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadNextQuestion();
    }

    function loadNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            questionCounter.textContent = `${currentQuestionIndex + 1}/15`;
            optionsContainer.innerHTML = "";
            currentQuestion.response.forEach((option, index) => {
                const optionElement = document.createElement("div");
                optionElement.className = "option";
                optionElement.textContent = option.text;
                optionElement.addEventListener("click", () => selectAnswer(index));
                optionsContainer.appendChild(optionElement);
            });
            selectedAnswerIndex = -1;
            nextButton.style.display = "none";
            currentQuestionIndex++;
        } else {
            // the quizz's done
            quizContainer.style.display = "none";
            congratulationPopup.style.display = "block";
        }
    }

    function selectAnswer(index) {
        selectedAnswerIndex = index;
        const options = document.querySelectorAll(".option");
        options.forEach((option, optionIndex) => {
            option.classList.remove("selected");
        });
        options[index].classList.add("selected");
        nextButton.style.display = "block";
    }
    //The correct/wrong answer popup
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
    }
    function closePopup() {
        popup.style.display = "none";
        loadNextQuestion();
    }

    function checkAnswerAndShowPopup() {
        if (selectedAnswerIndex !== -1) {
            const isGood = questions[currentQuestionIndex - 1].response[selectedAnswerIndex].isGood;
            if (isGood) {
                showPopup("Correct Answer!");
                score++;
            } else {
                showPopup("Wrong Answer!");
            }
        } else {
            showPopup("Please select an answer before moving to the next question.");
        }
    }

    // Quizz end
    function showCongratulationPopup() {
        congratulationPopup.style.display = "block";
    }

    function showScoreboard() {
        congratulationPopup.style.display = "none";
        scoreboard.style.display = "block";
        scoreElement.textContent = `Score: ${score}`;
        restartButton.style.display = "block";
    }

    function restartGame() {
        currentQuestionIndex = 0;
        score = 0;
        restartButton.style.display = "none";
        scoreboard.style.display = "none";
        quizContainer.style.display = "block";
        loadNextQuestion();
    }

    // Getting the json questions
    fetch("./question.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
        })
        .catch(error => console.error(error)
    );

// Event listeners for the start button, Next Question button, and popup close button
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", checkAnswerAndShowPopup);
popupCloseButton.addEventListener("click", closePopup);
// Event listener for the Show Scoreboard button in the congratulation popup
showScoreboardButton.addEventListener("click", showScoreboard);
// Event listener for the Restart button
restartButton.addEventListener("click", restartGame);