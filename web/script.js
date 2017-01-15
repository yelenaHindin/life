var board = new FiniteBoard.FiniteBoard(20, 10);

var uiBoard = [];
var State = {
    RUNNING: 1,
    EDITING: 2
};

var currentState = State.EDITING;


window.onload = function() {

    var tbl = document.getElementById("tblFiniteBoard");

    tbl.addEventListener("click", function(evt) {
        if (currentState != State.EDITING)
            return;

        var cell = evt.srcElement;
        var gameX = cell.getAttribute("gameX");
        var gameY = cell.getAttribute("gameY");

        if (evt.ctrlKey) {
            board.setDead(gameX, gameY);
            uiBoard[gameY][gameX].className = "cell dead";
        } else {
            board.setLive(gameX, gameY);
            uiBoard[gameY][gameX].className = "cell live";
        }


    });

    var w = board.width();
    var h = board.height();
    console.log(w, h);

    for(var y = 0; y < h; y++) {
        uiBoard[y] = [];
        var tr = document.createElement("tr");
        tbl.appendChild(tr);
        for(var x = 0; x < h; x++) {
            var td = document.createElement("td");
            uiBoard[y][x] = td;
            td.setAttribute("gameX",x);
            td.setAttribute("gameY",y);
            td.setAttribute("class","cell dead");
            tr.appendChild(td);
        }
    }
}
