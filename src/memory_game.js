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

function memory(){
    // pick 8 pictures
    let numberOfPics = 8;
    let pickedCodes = pickPictures(numberOfPics);
    let randomizedPics = randomizePictures(pickedCodes);
    let choiceOne = '';
    let choiceTwo = '';
    let gameSet = new Set();

    for (let i = 0; i < randomizedPics.length; i++){
        const button = document.createElement('button');
        button.id = randomizedPics[i] + '-' + i;
        button.className = "button";
        let pic = picture_codes[randomizedPics[i]];
        button.onclick = () => {
            if (choiceOne && choiceTwo){
                if (!gameSet.has(choiceOne)){
                    document.getElementById(choiceOne).innerHTML = '';
                    document.getElementById(choiceTwo).innerHTML = '';
                }

                choiceOne = '';
                choiceTwo = '';
            }
            if (!button.innerHTML) {
                if (!choiceOne){
                    choiceOne = button.id;
                } else {
                    if (!choiceTwo){
                        choiceTwo = button.id;
                    }
                }
                button.innerHTML = pic;
            }

            if (choiceOne && choiceTwo){
                if (choiceOne.split('-')[0] === choiceTwo.split('-')[0]){
                    gameSet.add(choiceOne);
                    gameSet.add(choiceTwo);
                }
            }

            if (gameSet.size === numberOfPics * 2){
                alert('You won!');
            }
        };
        const container = document.getElementById('grid-container');
        container.style = 'grid-template-columns: auto auto auto auto';
        container.appendChild(button);
    }
}

(function (){
    document.addEventListener('DOMContentLoaded', memory);
})()
