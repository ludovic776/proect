const cardNames = ['chili', 'grapes', 'lemon', 'orange', 'pineapple', 'strawberry', 'tomato', 'watermelon', 'cherries'];
const cards = cardNames.map(name => ({ name, image: `images/${name}.png` }));
const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.querySelector('.score');
let score = 0, firstCard, secondCard, lockBoard = false;

function createBoard() {
    const doubledCards = [...cards, ...cards];
    doubledCards.forEach(({name, image}, index) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.name = name;
        div.dataset.index = index;
        div.innerHTML = `<img src="${image}" alt="${name}">`;
        div.addEventListener('click', flipCard);
        gridContainer.appendChild(div);
    });
    shuffleCards();
}

//сравнение открыты ли карточки
const flipCard = function() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {    
        secondCard = this;
        checkForMatch();
    }
}
//проверяет, совпадают ли открытые карточки
const checkForMatch = function() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

const disableCards = function() {
    [firstCard, secondCard].forEach(card => {
        card.removeEventListener('click', flipCard);
        card.classList.add('matched');
    });
    score++;
    scoreDisplay.textContent = score;
    resetBoard();
}

// закрывает обе открытые карточки
const unflipCards = function() {
    lockBoard = true;
    setTimeout(() => {
        [firstCard, secondCard].forEach(card => card.classList.remove('flipped'));
        resetBoard();
    }, 1000);
}

// сбрасывает переменные firstCard и secondCard 
const resetBoard = function() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

