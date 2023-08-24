const speed = 20;
function getBall(){
    return document.getElementById('ball');
}

function moveBallUp(ball) {

    let newTop = Number(ball.style.top.replace('px', '')) - speed;
    if (newTop < 0) {
        newTop = 0;
    }
    ball.style.top = newTop + 'px';
}

function getHeightOfDocument(){
    const body = document.body;
    const html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function getWidthOfDocument(){
    const body = document.body;
    const html = document.documentElement;

    return Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
}

function moveBallDown(ball) {
    let newTop = Number(ball.style.top.replace('px', '')) + speed;
    if (newTop >= getHeightOfDocument() - 50) {
        newTop = getHeightOfDocument() - 50;
    }
    ball.style.top = newTop + 'px';
}

function moveBallLeft(ball) {
    let newLeft = Number(ball.style.left.replace('px', '')) - speed;
    if (newLeft <= 0) {
        newLeft = 0;
    }
    ball.style.left = newLeft + 'px';
}

(function (){
    document.onkeydown = (e) => {
        const ball = getBall();
        if (e.key === 'ArrowUp'){
            moveBallUp(ball);
        }
        if (e.key === 'ArrowDown'){
            moveBallDown(ball);
        }
        if (e.key === 'ArrowLeft'){
            moveBallLeft(ball);
        }
        if (e.key === 'ArrowRight'){
            let newLeft = Number(ball.style.left.replace('px', '')) + speed;
            if (newLeft >= getWidthOfDocument() - 50){
                newLeft = getWidthOfDocument() - 50;
            }
            ball.style.left = newLeft + 'px';
        }
    }
})();
