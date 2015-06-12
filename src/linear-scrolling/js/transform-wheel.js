var _ = require('lodash');
var Constants = require('./constants.js');

function TransformWheel(map) {
    if (!_.isArray(map)) {
        throw new Error('TransformWheel.ctr: `map` is not an array');
    }

    this.length = 0;

    _.forEach(map, _.ary(Array.prototype.push, 1), this);
}

TransformWheel.prototype.rotate = function (direction) {
    var i, temp;

    if (direction === Constants.FORWARD) {
        i = this.length - 1;
        temp = this[i];
        while (i > 0) {
            this[i] = this[--i];
        }
        this[0] = temp;
    } else if (direction === Constants.BACKWARD) {
        i = 0;
        temp = this[i];
        while (i < this.length - 1) {
            this[i] = this[++i];
        }
        this[this.length - 1] = temp;
    }

    return this;
};

module.exports = TransformWheel;