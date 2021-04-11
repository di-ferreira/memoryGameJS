const cards = document.querySelectorAll('.card'); /* captura todas as cartas */
const modal = document.querySelector('.modal'); /* captura a div modal */
const modalButton = document.querySelector('.modal-button'); /* captura botão para reiniciar o game */

// variaveis usadas
let hasFlippedCard, lockBoard = false;
let firstCard, secondCard;

// Função para virar as cartas
function flipCard(){

    if(lockBoard)return;
    if(this===firstCard)return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        firstCard=this;
        hasFlippedCard=true;
        return;
    }
    secondCard=this;
    hasFlippedCard=false;

    checkForMatch();
}

// verifica se as cartas são iguais
function checkForMatch(){
    let contentFirstCard = firstCard.dataset.card;
    let contentSecondCard = secondCard.dataset.card;
 
    if(contentFirstCard === contentSecondCard){
        disableCards();
        return;
    }

    unflipCards();
}

// desabilita as cartas iguais
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// desvira as cartas diferentes
function unflipCards(){
    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

// reseta as variaveis
function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
    const flipedCards = document.querySelectorAll('.flip'); /* Captura todas as cartas com class flip */

    if(cards.length === flipedCards.length){
        modal.style.display = 'flex';
    }

}

function resetGame(){
    modal.style.removeProperty('display');
    cards.forEach((card)=>{
        let randomNumber = Math.floor(Math.random() * 12);
        card.classList.remove('flip');
        card.addEventListener('click',flipCard);
        card.style.order = randomNumber;
    });
}

(
    function startGame(){
        cards.forEach((card)=>{
            let randomNumber = Math.floor(Math.random() * 12);
            card.style.order = randomNumber;
        });
    }
)();

modalButton.addEventListener('click', resetGame);

cards.forEach((card)=>{
    card.addEventListener('click',flipCard)
});