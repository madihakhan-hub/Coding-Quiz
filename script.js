const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlink Tool Machine Language", correct: false},
            { text: "HyperText Markup Language", correct: true},
            { text: "HyperText Modular Linguistics", correct: false},
            { text: "Highly Technical Marketing Language", correct: false},
        ]
    },
    {
        question: "____ is a keyword added to a selector that lets you style a specific part of the selected element(s).",
        answers: [
            { text: "Flexbox", correct: false},
            { text: "Wireframe", correct: false},
            { text: "Pseudo-element", correct: true},
            { text: "Typography", correct: false},
        ]
    },
    {
        question: "Which programming language is used to generate interactivity within a webpage?",
        answers: [
            { text: "HTML", correct: false},
            { text: "Python", correct: false},
            { text: "CSS", correct: false},
            { text: "Javascript", correct: true},
        ]
    },
    {
        question: "Which of the following options include types of event listeners?",
        answers: [
            { text: "Keyup", correct: false},
            { text: "Keydown", correct: false},
            { text: "Click", correct: false},
            { text: "All of the above", correct: true},
        ]
    }
];

const questionEL = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEL.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionEL.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
       showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();