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
    if (x < 0 || x >= this._width ||
        y < 0 || y >= this._height) {
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
            if (xx == 0 && yy == 0)
                continue;
            if (this.isLive(x + xx, y + yy))
                n++;
        }
    }
    return n;
}

FiniteBoard.FiniteBoard.prototype.step = function() {
    var newGenfield = FiniteBoard._createField(this._width, this._height);

    for (var x = 0; x < this._width; x++) {
        for (var y = 0; y < this._height; y++) {
            var nLive = this.nLiveNeighbors(x, y);

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
                break;
            }
        }
    }

    this._field = newGenfield;
}

if (typeof process !== 'undefined' && process) {
    module.exports = FiniteBoard;
}
