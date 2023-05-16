// Carga de datos con fetch
fetch('quiz-data.json')
  .then(response => response.json())
  .then(data => createQuiz(data))
  .catch(error => console.error(error));

function createQuiz(data) {

const quizData = {
  questions: [
    {
      question: "Where was Manuel Belgrano born?",
      answers: ["USA", "France", "Argentina", "UK"],
      correctAnswer: "Argentina"
    },
    {
      question: "What is the capital of Spain?",
      answers: ["Madrid", "Barcelona", "Seville", "Valencia"],
      correctAnswer: "Madrid"
    },
    {
      question: "What is the most abundant material on earth?",
      answers: ["Magnesium", "Oxygen", "Potassium", "Sodium"],
      correctAnswer: "Oxygen"
    },
    {
      question: "Who discovered the theory of relativity?",
      answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      correctAnswer: "Albert Einstein"
    },
    {
      question: "What geometric shape is generally used for stop signs?",
      answers: ["Octagon", "Sphere", "Cube", "Triangle"],
      correctAnswer: "Octagon"
    },
    {
      question: "Who named the Pacific Ocean?",
      answers: ["Mark Whalbherg", "Jimmy Stuart", "William Jhonson", "Ferdinand Magellan"],
      correctAnswer: "Ferdinand Magellan"
    }, {
      question: "Which monarch officially made Valentine's Day a holiday in 1537?",
      answers: ["Dant II", "Fernando VII", "Henry VIII", "Nataly III"],
      correctAnswer: "Henry VIII"
    },
    {
      question: "Who was the first woman to win a Nobel Prize (in 1903)?",
      answers: ["Marie Curie", "Johana Sullivan", "Jennifer Stone", "Carla Maiers"],
      correctAnswer: "Marie Curie"
    },
    {
      question: "What is the romanized Arabic word for MOON",
      answers: ["Shumar", "Skaar", "Qamar", "Limar"],
      correctAnswer: "Qamar"
    },
    {
      question: "Which country consumes the most chocolate per capita?",
      answers: ["USA", "Kenia", "Switzerland", "Germany"],
      correctAnswer: "Switzerland"
    }
  ]
};

// Storage part
localStorage.setItem('quizData', JSON.stringify(quizData));
const storedQuizData = JSON.parse(localStorage.getItem('quizData'));

// Song 
const song = new Audio('./mariobros.mp3');

function createQuiz(data) {
  const container = document.querySelector('#container');
  let score = 0;
  let questionNumber = 0;

  function showQuestion() {
    const question = document.createElement('h2');
    question.textContent = data.questions[questionNumber].question;
    container.appendChild(question);

    const answers = document.createElement('div');
    data.questions[questionNumber].answers.forEach(answer => {
      const answerButton = document.createElement('button');
      answerButton.textContent = answer;
      answerButton.addEventListener('click', () => {
        if (answer === data.questions[questionNumber].correctAnswer) {
          score++;
        }
        questionNumber++;
        if (questionNumber < data.questions.length) {
          anime({
            targets: [question, answers],
            opacity: [1, 0],
            translateY: ['-50px', '0px'],
            easing: 'easeInOutQuad',
            duration: 500,
            complete: function() {
              container.innerHTML = '';
              showQuestion();
            }
          });
        } else {
          anime({
            targets: [question, answers],
            opacity: [1, 0],
            translateY: ['-50px', '0px'],
            easing: 'easeInOutQuad',
            duration: 500,
            complete: function() {
              container.innerHTML = '';
              showScore();
            }
          });
        }
      });
      answers.appendChild(answerButton);
    });
    container.appendChild(answers);

    anime({
      targets: [question, answers],
      opacity: [0, 1],
      translateY: ['50px', '0px'],
      easing: 'easeInOutQuad',
      duration: 500
    });
  }

  function showScore() {
    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Your final score is ${score}/${data.questions.length}`;
    container.appendChild(scoreDisplay);

    if (score === data.questions.length) {
      song.play();
    }
  }

  showQuestion();
}

createQuiz(storedQuizData);
}