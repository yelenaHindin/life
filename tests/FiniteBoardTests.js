var should = require('should');
var FiniteBoard = require('../src/FiniteBoard.js')


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

});
