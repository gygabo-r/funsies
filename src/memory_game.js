let choiceOne = '';
let choiceTwo = '';
let gameSet = new Set();
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
    let pics = Object.keys(picture_codes)
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
    if (choiceOne && choiceTwo) {
        if (!gameSet.has(choiceOne)) {
            document.getElementById(choiceOne).innerHTML = '';
            document.getElementById(choiceTwo).innerHTML = '';
        }

        choiceOne = '';
        choiceTwo = '';
    }
}

function evaluateIfMatched() {
    if (choiceOne && choiceTwo) {
        if (choiceOne.split('-')[0] === choiceTwo.split('-')[0]) {
            gameSet.add(choiceOne);
            gameSet.add(choiceTwo);
        }
    }
}

function updateGameState(button, pic) {
    const innerCard = button.childNodes[1];
    innerCard.classList.add('flip-card-flipped');
    if (!choiceOne){
        choiceOne = button.id;
    } else {
        if (!choiceTwo && choiceOne !== button.id){
            choiceTwo = button.id;
        }
    }
}

function appendCard(randomizedPics, i) {
    const template = document.getElementById('card-template').cloneNode(true);
    template.id = randomizedPics[i] + '-' + i;
    const cardBackSide = template.childNodes[1].childNodes[3];
    const sp = document.createElement('span');
    sp.innerHTML = picture_codes[randomizedPics[i]];
    cardBackSide.appendChild(sp);
    const container = document.getElementById('grid-container');
    container.style = 'grid-template-columns: auto auto auto auto';
    container.appendChild(template);
    return template;
}

function memory(){
    // pick 8 pictures
    let numberOfPics = 8;
    let pickedCodes = pickPictures(numberOfPics);
    let randomizedPics = randomizePictures(pickedCodes);
    for (let i = 0; i < randomizedPics.length; i++){
        const button = appendCard(randomizedPics, i);
        let pic = picture_codes[randomizedPics[i]];
        button.onclick = () => {
            clearStateOnEveryThirdClick();
            updateGameState(button, pic);
            evaluateIfMatched();

            if (gameSet.size === numberOfPics * 2){
                alert('You won!');
            }
        };

    }
}

(function (){
    document.addEventListener('DOMContentLoaded', memory);
})()
