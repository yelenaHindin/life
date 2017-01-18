var board = new FiniteBoard.FiniteBoard(20, 10);

var uiBoard = [];
var State = {
    RUNNING: 1,
    EDITING: 2
};

var currentState = State.EDITING;

var svgns = "http://www.w3.org/2000/svg";

window.onload = function() {

    var f = document.getElementById("field");

    f.addEventListener("click", function(evt) {
        if (currentState != State.EDITING)
            return;

        var cell = evt.srcElement;
        if (cell.tagName != "rect")
            return;

        var gameX = cell.getAttribute("gameX");
        var gameY = cell.getAttribute("gameY");

        if (evt.ctrlKey) {
            board.setDead(gameX, gameY);
        } else {
            board.setLive(gameX, gameY);
        }
    });

    var w = board.width;
    var h = board.height;
//    console.log(w, h);

    //shift rectangles from the border of canvas
    var px = 2;
    var py = 2;
    for(var y = 0; y < h; y++) {
        uiBoard[y] = [];
        for(var x = 0; x < w; x++) {
            var r = document.createElementNS(svgns, "rect");
            uiBoard[y][x] = r;
            r.setAttribute("gameX",x);
            r.setAttribute("gameY",y);
            r.setAttribute("width", "10");
            r.setAttribute("height", "10");
            r.setAttribute("x",px);
            r.setAttribute("y",py);
            r.setAttribute("rx", "2");
            r.setAttribute("ry", "2");

            r.setAttribute("class","cell dead");
            f.appendChild(r);
            px += 14;
        }
        px = 2;
        py += 14;
    }

    board.on('changed', function(x, y, live) {
        uiBoard[y][x].className.baseVal = "cell " + (live ? "live" : "dead");
    });
}

var stepTimeout;

function step()
{
    if (state != State.RUNNING)
        return;

    board.step();
    stepTimeout = setTimeout(step, 200);
}

function run()
{
    stopButton.disabled = false;
    runButton.disabled = true;
    state = State.RUNNING;

    step();
}

function stop()
{
    stopButton.disabled = true ;
    runButton.disabled = false ;
    state = State.EDITING;

    stepTimeout = null;
}
