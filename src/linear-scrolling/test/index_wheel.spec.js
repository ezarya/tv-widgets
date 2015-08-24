var chai = require('chai');
var IndexWheel = require('../js/index_wheel.js');
var Constants = require('../js/constants.js');

chai.should();

describe('IndexWheel', function() {

    describe('construction', function () {

        it('constructs IndexWheel object', function () {
            (new IndexWheel()).should.be.an.instanceof(IndexWheel);
            (new IndexWheel()).length.should.deep.equal(0);
            (new IndexWheel(3)).should.be.an.instanceof(IndexWheel);
            (new IndexWheel(3)).length.should.deep.equal(3);
        });

        it('is an array like object', function () {
            var wheel = new IndexWheel(3);

            wheel.length.should.equal(3);

            wheel[0].should.deep.equal(0);
            wheel[1].should.deep.equal(1);
            wheel[2].should.deep.equal(2);
        });

        it('constructs wheel using "start" parameter passed', function () {
            var wheel = new IndexWheel(3, 2);

            wheel.length.should.equal(3);

            wheel[0].should.deep.equal(2);
            wheel[1].should.deep.equal(0);
            wheel[2].should.deep.equal(1);
        });

        it('constructs wheel using "stop" parameter passed', function () {
            var wheel = new IndexWheel(3, 2, 4);

            wheel.length.should.equal(3);

            wheel[0].should.deep.equal(2);
            wheel[1].should.deep.equal(3);
            wheel[2].should.deep.equal(0);
        });

    });

    var wheel = null;

    beforeEach(function () {
        wheel = new IndexWheel(7);
    });

    describe('#forward', function () {

        it('moves wheel indexes forward', function () {
            var wheel = new IndexWheel(3);

            wheel.forward();

            wheel[0].should.deep.equal(1);
            wheel[1].should.deep.equal(2);
            wheel[2].should.deep.equal(0);
        });

        it('moves wheel indexes forward taking into account "stop" value', function () {
            var wheel = new IndexWheel(3, 1, 5);

            wheel.forward();

            wheel[0].should.deep.equal(2);
            wheel[1].should.deep.equal(3);
            wheel[2].should.deep.equal(4);

            wheel.forward();

            wheel[0].should.deep.equal(3);
            wheel[1].should.deep.equal(4);
            wheel[2].should.deep.equal(0);
        });

    });

    describe('#backward', function () {

        it('moves wheel indexes backward', function () {
            var wheel = new IndexWheel(3);

            wheel.backward();

            wheel[0].should.deep.equal(2);
            wheel[1].should.deep.equal(0);
            wheel[2].should.deep.equal(1);
        });

        it('moves wheel indexes backward taking into account "stop" value', function () {
            var wheel = new IndexWheel(3, 1, 5);

            wheel.backward();

            wheel[0].should.deep.equal(0);
            wheel[1].should.deep.equal(1);
            wheel[2].should.deep.equal(2);

            wheel.backward();

            wheel[0].should.deep.equal(4);
            wheel[1].should.deep.equal(0);
            wheel[2].should.deep.equal(1);
        });

    });

    describe('#rotate', function () {

        it('rotates wheel forward', function () {
            var wheel = new IndexWheel(3);

            wheel.rotate(Constants.FORWARD);

            wheel[0].should.deep.equal(1);
            wheel[1].should.deep.equal(2);
            wheel[2].should.deep.equal(0);
        });

        it('rotates wheel backward', function () {
            var wheel = new IndexWheel(3);

            wheel.rotate(Constants.BACKWARD);

            wheel[0].should.deep.equal(2);
            wheel[1].should.deep.equal(0);
            wheel[2].should.deep.equal(1);
        });

    });

});
