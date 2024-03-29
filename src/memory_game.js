let gameSet = new Set();
let currentSelection = new Set();
const gridContainer = 'grid-container';
const picture_codes = {
    "lion": "&#129409;",
    "robot": "&#129302;",
    "cowboy": "&#129312;",
    "clown":  "&#129313;",
    "boxing_glove": "&#129354;",
    "avocado": "&#129361;",
    "cucumber": "&#129362;",
    "kiwi": "&#129373;",
    "mango": "&#129389;",
    "shark": "&#129416;",
    "bat": "&#129415;",
    "duck": "&#129414;",
    "fox": "&#129418;",
    "butterfly": "&#129419;",
    "gorilla": "&#129421;",
    "sauropod": "&#129429;",
    "hedgehog": "&#129428;",
    "trex": "&#129430;",
    "kangaroo": "&#129432;",
    "cupcake": "&#129473;",
    "zebra": "&#129427;",
    "owl": "&#129417;",
    "badger": "&#129441;",
    "swan": "&#129442;",
    "sloth": "&#129445;"
};


function pickPictures(numberOfPics) {
    let pickedCodes = [];
    let pics = Object.keys(picture_codes);
    for (let i = 0; i < numberOfPics; i++) {
        const index = Math.floor(Math.random() * pics.length);
        pickedCodes.push(pics[index]);
        pics.splice(index, 1);
    }
    pickedCodes = pickedCodes.reduce((acc, curr) => {
        return [...acc, curr, curr]
    }, []);
    return pickedCodes;
}

function randomizePictures(pickedCodes) {
    let randomizedPics = [];
    let length = pickedCodes.length;
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * pickedCodes.length);
        randomizedPics.push(pickedCodes[index]);
        pickedCodes.splice(index, 1);
    }
    return randomizedPics;
}

function clearStateOnEveryThirdClick() {
    if (currentSelection.size > 1) {
        const values = Array.from(currentSelection);
        if (!gameSet.has(values[0])){
            document.getElementById(values[0]).childNodes[1].classList.remove('flip-card-flipped');
            document.getElementById(values[1]).childNodes[1].classList.remove('flip-card-flipped');
        }
        currentSelection = new Set();
    }
}

function updateGameState() {
    if (currentSelection.size > 1) {
        const values = Array.from(currentSelection);
        const first = values[0];
        const second = values[1];
        if (first.split('-')[0] === second.split('-')[0]) {
            gameSet.add(first);
            gameSet.add(second);
        }
    }
}

function updateCurrenState(button) {
    const innerCard = button.childNodes[1];
    innerCard.classList.add('flip-card-flipped');
    currentSelection.add(button.id);
}

function getGameGrid() {
    return document.getElementById(gridContainer);
}

function appendCard(randomizedPics, i) {
    const template = document.getElementById('card-template').cloneNode(true);
    template.id = randomizedPics[i] + '-' + i;
    const cardBackSide = template.childNodes[1].childNodes[3];
    const sp = document.createElement('span');
    sp.innerHTML = picture_codes[randomizedPics[i]];
    cardBackSide.appendChild(sp);

    const container = getGameGrid();

    getGameGrid().appendChild(template);
    return template;
}

function resetGame(modal, onRestart, onOpen) {
    modal.style.display = "none";
    currentSelection = new Set();
    gameSet = new Set();
    getGameGrid().innerHTML = '';
    onRestart(onOpen);
}

function wireUpModal(onRestart){
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    const onOpen = () => modal.style.display = "block"

    span.onclick = () => {
        resetGame(modal, onOpen, onRestart);
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            resetGame(modal, onOpen, onRestart);
        }
    }

    return onOpen;
}

function memory(onOpen){
    let numberOfPics = 8;
    getGameGrid().style = 'grid-template-columns: auto auto auto auto';
    let pickedCodes = pickPictures(numberOfPics);
    let randomizedPics = randomizePictures(pickedCodes);
    for (let i = 0; i < randomizedPics.length; i++){
        const button = appendCard(randomizedPics, i);
        button.onclick = () => {
            if (currentSelection.has(button.id)) return;
            clearStateOnEveryThirdClick();
            updateCurrenState(button);
            updateGameState();

            if (gameSet.size === numberOfPics * 2){
                onOpen();
            }
        };

    }
}

(function (){
    document.addEventListener('DOMContentLoaded', () => {
        const onOpen = wireUpModal(memory);
        memory(onOpen);
    });
})()
