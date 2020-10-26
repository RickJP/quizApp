const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let questions = [
  {
    question: 'What is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '21',
    choice4: '17',
    answer: 2,
  },
  {
    question: 'The tallest building in the world is located in which city?',
    choice1: 'Dubai',
    choice2: 'New York',
    choice3: 'Shanghai',
    choice4: 'None of these',
    answer: 1,
  },
  {
    question:
      'What percentage of American adults believe that chocolate milk comes from brown cows?',
    choice1: '20%',
    choice2: '18%',
    choice3: '7%',
    choice4: '33%',
    answer: 3,
  },
  {
    question:
      'Approxiametely what percent of U.S power outages are caused by squirrels?',
    choice1: '10-20%',
    choice2: '5-10%',
    choice3: '15-20%',
    choice4: '30-40%',
    answer: 1,
  },
];

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let avaliableQuestions = [...questions];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionsCounter = 0;
  score = 0;
  answer = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  console.log(avaliableQuestions.length, questionsCounter);
  if (avaliableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('end.html');
  }

  questionsCounter++;
  progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionsCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  avaliableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classesToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classesToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classesToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classesToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
