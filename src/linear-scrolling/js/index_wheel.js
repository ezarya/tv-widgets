var Constants = require('./constants');

var push = Array.prototype.push;

function IndexWheel(length, start, stop) {
    start = start || 0;
    length = length || 0;
    stop = stop || length;

    this.stop = stop;

    while (length--) {
        if (start === stop) {
            start = 0;
        }
        push.call(this, start++);
    }
}

IndexWheel.prototype.length = 0;

IndexWheel.prototype.rotate = function (direction) {
    if (direction === Constants.FORWARD) {
        this.forward();
    } else if (direction === Constants.BACKWARD) {
        this.backward();
    }
};

IndexWheel.prototype.forward = function () {
    var i, len;

    for (i = 0, len = this.length; i < len; i++) {
        if (this[i] + 1 < this.stop) {
            this[i] = this[i] + 1;
        } else {
            this[i] = 0;
        }
    }
};

IndexWheel.prototype.backward = function () {
    var i;

    for (i = this.length - 1; i >= 0; i--) {
        if (this[i] - 1 < 0) {
            this[i] = this.stop - 1;
        } else {
            this[i] = this[i] - 1;
        }
    }
};

module.exports = IndexWheel;
