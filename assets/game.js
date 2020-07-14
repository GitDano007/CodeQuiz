const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



                let questions = [
                    {
                        question: 'What is the main purpose of using Bootstrap?',
                        choice1: 'writing JavaScript',
                        choice2: 'writing HTML',
                        choice3: 'developing responsive and mobile websites',
                        choice4: 'file control',
                        answer: 3,
                    },
                                    {
                                        question:
                                            "What does HTML stand for?",
                                        choice1: "how to make links",
                                        choice2: "how to markup language",
                                        choice3: "hyper text mark-up language",
                                        choice4: "hard text markup language",
                                        answer: 3,
                                    },
                                    {
                        question: " where do you place a link to an external CSS file?",
                        choice1: "in the body of your css file",
                        choice2: "in your html file",
                        choice3: "in your JS file",
                        choice4: "in a file by itself",
                        answer: 2,
                    },
                ];


var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");


var secondsLeft = 30;

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
  
                    if(secondsLeft <= 0) {
                        clearInterval(timerInterval);
                        sendMessage();
                    
                    }
  
   }, 1000);
  }

    function sendMessage() {
        timeEl.textContent = " ";
        return window.location.assign('end.html');
  }
    setTime();


const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 3;


                        startGame = () => {
                            questionCounter = 0;
                            score = 0;
                            availableQuestions = [...questions];
                            getNewQuestion();
                        };

                        getNewQuestion = () => {
                            if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
                                localStorage.setItem('mostRecentScore', score);
                                return window.location.assign('end.html');
                            }

                            questionCounter++;
                        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
                        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

                            const questionIndex = Math.floor(Math.random() * availableQuestions.length);
                            currentQuestion = availableQuestions[questionIndex];
                            question.innerText = currentQuestion.question;

                            choices.forEach((choice) => {
                                const number = choice.dataset['number'];
                                choice.innerText = currentQuestion['choice' + number];
                            });

                            availableQuestions.splice(questionIndex, 1);
                            acceptingAnswers = true;
                        };

                        choices.forEach((choice) => {
                            choice.addEventListener('click', (e) => {
                                if (!acceptingAnswers) return;

                                acceptingAnswers = false;
                                const selectedChoice = e.target;
                                const selectedAnswer = selectedChoice.dataset['number'];
                                const classToApply =
                                    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

                                if (classToApply === "correct") {
                                    incrementScore(CORRECT_BONUS);
                                    }

                                    if (classToApply === "incorrect") {
                                        secondsLeft = secondsLeft - 10;
                                        timerInterval = secondsLeft;
                                    }

                                selectedChoice.parentElement.classList.add(classToApply);

                                setTimeout(() => {
                                    selectedChoice.parentElement.classList.remove(classToApply);
                                getNewQuestion();
                                }, 1000);
                            }); 
                        });

                        incrementScore = num => {
                            score += num;
                            scoreText.innerText = score;
                        };

                        startGame();
