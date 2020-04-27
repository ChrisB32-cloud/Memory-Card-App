// 1 start
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// 2 Keep track of current card
let currentActiveCard = 0;

// 3 an array Store DOM cards
const cardsEl = [];

// 4 store card data {hard codde for now}
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// 16 Store card data
const cardsData = getCardsData();

// 5 Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// 6 Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  // 7 add active class to first card
  if (index === 0) {
    card.classList.add('active');
  }
  // 8
  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
            ${data.question}?
            </p>
        </div>
        <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
        </div>
    </div>
  `;

  // 11 create event listener on a particluar card
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // 9 Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  // 12 for page number
  updateCurrentText();
}

// 13 Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// 17 get cards from local storage
function getCardsData() {
  // when retreiving the data we have to turn in back into an array with JSON.parse
  const cards = JSON.parse(localStorage.getItem('cards'));
  // ternary operator {short hand if statment}
  return cards === null ? [] : cards;
}

// 10
createCards();

// 22 add cards to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));

  window.location.reload();
}

// 14 Event listeners
// Next Button
nextBtn.addEventListener('click', () => {
  // className basiclly overrides
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  // arrays are zero based so we have to do - 1 because it doesn't start at 1, it starts at zero
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// 15
// Prev Button
prevBtn.addEventListener('click', () => {
  // className basiclly overrides
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  // arrays are zero based so we have to do - 1 because it doesn't start at 1, it starts at zero
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// 18 Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// 19 Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// 20 Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // Not destructoring, below is equivalent to { question: question ...etc}
    // creating a new Object
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    // 21
    setCardsData(cardsData);
  }
});

// 23 clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
