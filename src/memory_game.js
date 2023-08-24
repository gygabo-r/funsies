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





function memory(){
    for (key of Object.keys(picture_codes)){
        const button = document.createElement('button');
        button.id = key;
        button.innerHTML = picture_codes[key];
        button.className = "button";
        document.body.appendChild(button);
    }
}

(function (){
    document.addEventListener('DOMContentLoaded', memory);
})()
