var should = require('should');
var FiniteBoard = require('../src/FiniteBoard.js')

function nLive(board) {
    var n = 0;

    for (var x = 0; x < board.width(); x++) {
        for (var y = 0; y < board.height(); y++) {
            if (board.isLive(x, y)) {
                n++;
            }
        }
    }

    return n;
}

describe('Finite life test', function() {
    var board;

    beforeEach('create', function() {
        board = new FiniteBoard.FiniteBoard(20, 10);
    });

    afterEach('create', function() {
        board = null;
    });

    it('create', function() {
        board.width().should.be.equal(20);
        board.height().should.be.equal(10);
    });

    it('single cell death', function() {
        board.setLive(5, 5);
        nLive(board).should.be.equal(1);
        board.step();
        nLive(board).should.be.equal(0);
    });

    it('square live forever', function() {
        board.setLive(5, 5);
        board.setLive(5, 6);
        board.setLive(6, 5);
        board.setLive(6, 6);
        nLive(board).should.be.equal(4);
        board.step();
        nLive(board).should.be.equal(4);
    });

});
