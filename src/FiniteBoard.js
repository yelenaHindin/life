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

    this._callbacks = {}

}

FiniteBoard.FiniteBoard.prototype = {
    get width() {
        return this._width;
    },

    get height() {
        return this._height;
    },

    isLive: function(x, y) {
        if (x < 0 || x >= this._width ||
            y < 0 || y >= this._height) {
            return false;
        }

        return this._field[y][x];
    },

    setLive: function(x, y) {
        this._field[y][x] = true;
        this.fire('changed', x, y, true);
    },

    setDead: function(x, y) {
        this._field[y][x] = false;
        this.fire('changed', x, y, false);
    },

    nLiveNeighbors:  function (x, y) {
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
    },

    step: function() {
        var newGenfield = FiniteBoard._createField(this._width, this._height);

        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                var nLive = this.nLiveNeighbors(x, y);

                switch (nLive) {
                case 0:
                case 1:
                    newGenfield[y][x] = false;
                    this.fire('changed', x, y, false);
                    break;
                case 2:
                    newGenfield[y][x] = this._field[y][x];
                    break;
                case 3:
                    newGenfield[y][x] = true;
                    this.fire('changed', x, y, true);
                    break;
                default:
                    newGenfield[y][x] = false;
                    this.fire('changed', x, y, false);
                    break;
                }
            }
        }

        this._field = newGenfield;
    },

    on: function(name, callback) {
        if (typeof name != 'string' )
            throw new Error("Invalid argument, should be a function");

        if (typeof callback != 'function' )
            throw new Error("Invalid argument, should be a function");

        this._callbacks[name] = callback;
    },

    fire: function(name) {
        var cb = this._callbacks[name];

        Array.prototype.shift.apply(arguments);
        cb.apply(this, arguments);
    }

}

if (typeof process !== 'undefined' && process) {
    module.exports = FiniteBoard;
}
