var _ = require('lodash');

var Constants = require('./constants.js');
var IndexWheel = require('./index_wheel');

function getTransformStyle(coords) {
    return 'translate3d(' + [
        coords[0].toFixed(4),
        coords[1].toFixed(4),
        coords[2].toFixed(4)
    ].join('px,') + ')';
}

function Scroller(element, options) {
    this.element = element;
    this.options = _.defaults({}, options, Scroller.defaults);
    this.items = _.toArray(this.element.children);
    this.wheel = new IndexWheel(this.items.length);

    this.init();
}

Scroller.prototype.init = function () {
    var wheel = this.wheel,
        scrollStep = this.options.scrollStep,
        items = this.items;;

    _.forEach(this.wheel, function (itemIndex, itemPosition) {
        var xCoord = itemPosition * scrollStep;

        items[itemIndex].style.webkitTransform = getTransformStyle([xCoord, 0, 0]);
    });
};

Scroller.defaults = {
    viewport: 6,
    scrollStep: 190,
    scrollDuration: 200
};

Scroller.prototype.forward = function (long) {
    this.wheel.forward();
    this._scroll(Constants.FORWARD);
};

Scroller.prototype.backward = function () {
    this.wheel.backward();
    this._scroll(Constants.BACKWARD);
};

Scroller.prototype._scroll = function (direction) {
    var scrollStep = this.options.scrollStep,
        items = this.items;

    _.forEach(this.wheel, function (itemIndex, itemPosition, wheel) {
        var xCoord = itemPosition * scrollStep;

        if (direction === Constants.FORWARD && itemPosition === wheel.length - 1) {
            // last position
            items[itemIndex].style.webkitTransition = '-webkit-transform 0ms';
        } else if (direction === Constants.BACKWARD && itemPosition === 0) {
            // first position
            items[itemIndex].style.webkitTransition = '-webkit-transform 0ms';
        } else {
            items[itemIndex].style.webkitTransition = '-webkit-transform 200ms';
        }

        items[itemIndex].style.webkitTransform = getTransformStyle([xCoord, 0, 0]);
    });
};

Scroller.prototype._scrollLong = function(direction) {

};

module.exports = Scroller;
