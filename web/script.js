var board = new FiniteBoard.FiniteBoard(20, 10);

window.onload = function() {

    var tbl = document.getElementById("tblFiniteBoard");
    tbl.addEventListener("click", function(evt) {
        var cell = evt.srcElement;
        var gameX = cell.getAttribute("gameX");
        var gameY = cell.getAttribute("gameY");
        console.log(gameX);
        console.log(gameY);
    });

    var w = board.width();
    var h = board.height();
    console.log(w);
    console.log(h);
    for(var y = 0;y < h; y++){
        var tr = document.createElement("tr");
        tbl.appendChild(tr);
        for(var x = 0; x < h; x++) {
            var td = document.createElement("td");
            td.setAttribute("gameX",x);
            td.setAttribute("gameY",y);
            td.setAttribute("class","cell");
            tr.appendChild(td);
        }
    }
}
