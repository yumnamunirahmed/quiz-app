const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        answer: "Shakespeare"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        answer: "Blue Whale"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const questionContainer = document.getElementById("question-container");
const scoreSpan = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p><strong>${currentQuestion.question}</strong></p>
        <div class="answers">
            ${currentQuestion.options.map((option, index) => `
                <label>
                    <input type="radio" name="answer" value="${option}" /> ${option}
                </label><br>
            `).join('')}
        </div>
    `;
    nextButton.disabled = true; // Disable next button until answer is selected
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(button => {
        button.addEventListener("change", () => {
            nextButton.disabled = false; // Enable next button after answer is selected
        });
    });
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answer = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (answer === correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }
}

function showResult() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    scoreSpan.textContent = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.style.display = "block";
    nextButton.style.display = "inline-block";
    resultContainer.style.display = "none";
    displayQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

displayQuestion();
