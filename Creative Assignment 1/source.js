var TOTAL_DOTS = 12;
var dots = [];
var width = 0;

function move() {
    var bar = document.getElementById("myBar");
    width += 100 / TOTAL_DOTS;
    if (width > 99) {
        width = 100;
    }
    bar.style.width = width + '%';
    bar.innerHTML = Math.floor(width) + '%';
}

function init() {
    document.getElementById("myBar").innerHTML = "0%";
    for (var i = 0; i < TOTAL_DOTS; i++) {
        dots[i] = document.createElement('div');
        dots[i].innerHTML = i;
        dots[i].className = "dot";
        dots[i].style.position = "absolute";
        var gameBoard = document.getElementById("game");
        console.log("topleft", gameBoard.offsetTop + ', ' + gameBoard.offsetLeft);
        console.log("topright", gameBoard.offsetTop + ', ' + (gameBoard.offsetLeft + gameBoard.offsetWidth));
        console.log("bottomleft", (gameBoard.offsetTop + gameBoard.offsetHeight) + ', ' + gameBoard.offsetLeft);
        console.log("bottomleft", (gameBoard.offsetTop + gameBoard.offsetHeight) + ', ' + (gameBoard.offsetLeft + gameBoard.offsetWidth));
        var x = gameBoard.offsetTop + (Math.random() * gameBoard.offsetHeight);
        var y = gameBoard.offsetLeft + (Math.random() * gameBoard.offsetWidth);
        dots[i].style.top = x - 30;
        dots[i].style.left = y - 30;
        
        document.getElementById("game").appendChild(dots[i]);
    }
    document.querySelector('#game').addEventListener('mouseover', function(event) {
        if (event.target.classList.contains('dot')) {
            console.log('event', event);
            document.getElementById("game").removeChild(dots[event.target.innerHTML]);
            move();
        }
    })
}