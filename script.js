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

