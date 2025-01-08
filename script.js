import { questions } from "./questions.js";

const rulesContainer = document.querySelector('.rules-container');
const startQuizBtn = document.querySelector('.start-quiz-btn');
const quizContainer = document.querySelector('.quiz-container');
const countDownTime = document.querySelector('.countdown-time p');
const questionText = document.querySelector('.question p');
const questionOptions = document.querySelector('.answer-options');
const nextQsBtn = document.querySelector('.next-qs-btn button');
const outOffNum = document.querySelector('.outoff-questions p');
const resultContainer = document.querySelector('.result');
const resultMsg = document.querySelector('.message');
const resultFeedback = document.querySelector('.message-feedback');
const retakeQuizBtn = document.querySelector('.retake-btn');

let questionCount = 0;
let outoff = 1; 
let timeLeft;
let timeValue = 15;
let userScore = 0;

startQuizBtn.addEventListener('click', () => {
    quizContainer.classList.add('activeQuiz');
    rulesContainer.classList.add('inActiveRules');
    displayQNA(0);
    showOutOffNumber(1);
    quizCountDownTimer(timeValue);
});

nextQsBtn.addEventListener('click', () => {
    if(questionCount < questions.length - 1) {
        questionCount++;
        displayQNA(questionCount);

        outoff++;
        showOutOffNumber(outoff);

        clearInterval(timeLeft);
        quizCountDownTimer(timeValue);

        if(questionCount === questions.length - 1) {
            nextQsBtn.innerText = "Finish";
        }
    } else {
        displayResult();
    }
});

function displayQNA(index) {
    let optionData = ``;

    questionText.innerText = `${questions[index].num}. ${questions[index].question}`;
    optionData = `
    <button class="option" id="option-1">${questions[index].option[0]}</button>
    <button class="option" id="option-2">${questions[index].option[1]}</button>
    <button class="option" id="option-3">${questions[index].option[2]}</button>
    <button class="option" id="option-4">${questions[index].option[3]}</button>
    `
    questionOptions.innerHTML = optionData;  
    
    const option = questionOptions.querySelectorAll('.option');
    
    option.forEach((btn) => {
        btn.addEventListener('click', optionSelected);
    });

    nextQsBtn.style.display = "none";
}

function optionSelected(event) {
    clearInterval(timeLeft);

    const userAnswer = event.target.innerText;
    let userAnsDiv = event.target;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = questionOptions.children.length;

    let correctIcon = `<div class="tick-icon"><i class="fa-regular fa-circle-check"></i></div>`;
    let inCorrectIcon = `<div class="cross-icon"><i class="fa-regular fa-circle-xmark"></i></div>`;

    if(userAnswer === correctAnswer) {
        userAnsDiv.classList.add('correct-opt');
        userAnsDiv.insertAdjacentHTML("beforeend", correctIcon);
        userScore++;
    } else {
        userAnsDiv.classList.add('incorrect-opt');
        userAnsDiv.insertAdjacentHTML("beforeend", inCorrectIcon);

        for (let i = 0; i < allOptions; i++) {
            if(questionOptions.children[i].innerText === correctAnswer) {
                questionOptions.children[i].setAttribute("class", "option correct-opt");
                questionOptions.children[i].insertAdjacentHTML("beforeend", correctIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        questionOptions.children[i].classList.add('disabled');
    }

    nextQsBtn.style.display = "block";
}

function quizCountDownTimer(inSeconds) {
    timeLeft = setInterval(timer, 1000);
    
    function timer() {
        countDownTime.innerText = `${inSeconds}s`;

        inSeconds--;

        if(inSeconds < 0) {
            clearInterval(timeLeft);

            let correctAnswer = questions[questionCount].answer;
            let allOptions = questionOptions.children.length;
            let correctIcon = `<div class="tick-icon"><i class="fa-regular fa-circle-check"></i></div>`;

            for (let i = 0; i < allOptions; i++) {
                if(questionOptions.children[i].innerText === correctAnswer) {
                    questionOptions.children[i].setAttribute("class", "option correct-opt");
                    questionOptions.children[i].insertAdjacentHTML("beforeend", correctIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                questionOptions.children[i].classList.add('disabled');
            }
        
            nextQsBtn.style.display = "block";
        }
    }
}

function showOutOffNumber(index) {
    outOffNum.innerText = `${index} of ${questions.length} Questions`;
}

function displayResult() {
    quizContainer.classList.remove('activeQuiz');
    resultContainer.classList.add('activeResult');
    
    let message;
    let feedback;

    if(userScore <= 4) {
        message = `
        <p class="message"><span>Woo-Hoo! 🎉</span><br>You've Completed the Quiz and scored <span>${userScore}</span> out of <span>${questions.length}.</span></p>
        `;
        feedback = `
        <p class="message-feedback">You can do better! Keep practicing and try again.</p>
        `;
        resultMsg.innerHTML = message;
        resultFeedback.innerHTML = feedback;
    } else if(userScore <= 7) {
        message = `
        <p class="message"><span>Woo-Hoo! 🎉</span><br>You've Completed the Quiz and scored <span>${userScore}</span> out of <span>${questions.length}.</span></p>
        `;
        feedback = `
        <p class="message-feedback">Good job! You're on the right track, but there's room for improvement.</p>
        `;
        resultMsg.innerHTML = message;
        resultFeedback.innerHTML = feedback;
    } else if(userScore >= 8) {
        message = `
        <p class="message"><span>Woo-Hoo! 🎉</span><br>You've Completed the Quiz and scored <span>${userScore}</span> out of <span>${questions.length}.</span></p>
        `;
        feedback = `
        <p class="message-feedback">Excellent Work! You really nailed it. Keep up the performance!</p>
        `;
        resultMsg.innerHTML = message;
        resultFeedback.innerHTML = feedback;
    }
    
    sendToStartQuiz();
}

function sendToStartQuiz() {
    retakeQuizBtn.addEventListener('click', () => {
        window.location.reload();
    });
}