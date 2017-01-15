var FiniteBoard = {};

FiniteBoard._createField = function(w, h)
{
    var newField = []
    for (var y = 0; y < h; y++) {
        newField[y] = [];
        for (var x = 0; x < w; x++) {
            newField[y][x] = false;
        }
    }
    return newField;
}

FiniteBoard.FiniteBoard = function(w, h) {

    this._width = w;
    this._height = h;

    this._field = FiniteBoard._createField(w, h);

}

FiniteBoard.FiniteBoard.prototype.width = function() {
    return this._width;
}

FiniteBoard.FiniteBoard.prototype.height = function() {
    return this._height;
}

FiniteBoard.FiniteBoard.prototype.isLive = function(x, y) {
    if (x < 0 || x >= this.width ||
        y < 0 || y >= this.height) {
        return false;
    }

    return this._field[y][x];
}

FiniteBoard.FiniteBoard.prototype.setLive = function(x, y) {
    this._field[y][x] = true;
}


FiniteBoard.FiniteBoard.prototype.nLiveNeighbors =  function (x, y) {
    var n = 0;
    for (var xx = -1; xx <= 1; xx++) {
        for (var yy = -1; yy <= 1; yy++) {
            if (x == xx && y == yy)
                continue;
            if (this.isLive(x + xx, y + yy))
                n++;
        }
    }
    return n;
}

FiniteBoard.FiniteBoard.prototype.step = function() {
    var newGenfield = FiniteBoard._createField(this.width, this.height);

    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            var nLive = nLiveNeighbors(x, y);

            switch (nLive) {
            case 0:
            case 1:
                newGenfield[y][x] = false;
                break;
            case 2:
                break;
            case 3:
                newGenfield[y][x] = true;
                break;
            default:
                newGenfield[y][x] = false;
            }
        }
    }

    this._field = newGenfield;
}

module.exports = FiniteBoard;
