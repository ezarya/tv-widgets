var chai = require('chai');
var TransformWheel = require('../js/transform-wheel.js');
var Constants = require('../js/constants.js');

chai.should();

describe('TransformWheel', function() {

    describe('construction', function () {
        var transformWheel;

        beforeEach(function () {
            transformWheel = new TransformWheel([
                [0, 0, 0],
                [10, 0, 0],
                [20, 0, 0]
            ]);
        });

        it('constructs TransformWheel object', function () {
            transformWheel.should.be.an.instanceof(TransformWheel);
        });

        it('throws an error if constructing with not an array', function () {
            (function () {
                new TransformWheel(1);
            }).should.throw(Error);

            (function () {
                new TransformWheel(1, {});
            }).should.throw(Error);

            (function () {
                new TransformWheel(1, 1);
            }).should.throw(Error);

            (function () {
                new TransformWheel(1, '');
            }).should.throw(Error);
        });

        it('is an array like object', function () {
            transformWheel.length.should.equal(3);

            transformWheel[0].should.deep.equal([0, 0, 0]);
            transformWheel[1].should.deep.equal([10, 0, 0]);
            transformWheel[2].should.deep.equal([20, 0, 0]);
        });
    });

    var transformWheel = null;

    beforeEach(function () {
        transformWheel = new TransformWheel([
            [0, 0, 0],
            [10, 0, 0],
            [20, 0, 0]
        ]);
    });

    describe('#rotate', function () {
        it('cyclically moves forward transformation coordinates', function () {
            transformWheel.rotate(Constants.FORWARD);

            transformWheel[0].should.deep.equal([20, 0, 0]);
            transformWheel[1].should.deep.equal([0, 0, 0]);
            transformWheel[2].should.deep.equal([10, 0, 0]);

            transformWheel.rotate(Constants.FORWARD);

            transformWheel[0].should.deep.equal([10, 0, 0]);
            transformWheel[1].should.deep.equal([20, 0, 0]);
            transformWheel[2].should.deep.equal([0, 0, 0]);

            transformWheel.rotate(Constants.FORWARD);

            transformWheel[0].should.deep.equal([0, 0, 0]);
            transformWheel[1].should.deep.equal([10, 0, 0]);
            transformWheel[2].should.deep.equal([20, 0, 0]);
        });

        it('cyclically moves backward transformation coordinates', function () {
            transformWheel.rotate(Constants.BACKWARD);

            transformWheel[0].should.deep.equal([10, 0, 0]);
            transformWheel[1].should.deep.equal([20, 0, 0]);
            transformWheel[2].should.deep.equal([0, 0, 0]);

            transformWheel.rotate(Constants.BACKWARD);

            transformWheel[0].should.deep.equal([20, 0, 0]);
            transformWheel[1].should.deep.equal([0, 0, 0]);
            transformWheel[2].should.deep.equal([10, 0, 0]);

            transformWheel.rotate(Constants.BACKWARD);

            transformWheel[0].should.deep.equal([0, 0, 0]);
            transformWheel[1].should.deep.equal([10, 0, 0]);
            transformWheel[2].should.deep.equal([20, 0, 0]);
        });
    });

});