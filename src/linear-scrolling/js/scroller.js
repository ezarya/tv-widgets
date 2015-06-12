var _ = require('lodash');
var TWEEN = require('tween.js');

var Constants = require('./constants.js');
var TrandformWheel = require('./transform-wheel.js');

function getTransformStyle(coords) {
    return 'translate3d(' + [
        coords[0],
        coords[1],
        coords[2]
    ].join('px,') + ')';
}

function add(a, b) { return a + b; }

function sub(a, b) { return a - b; }

function buildTransformMap(delta, count, fauxCount) {
    var map = new Array(count + 2 * fauxCount),
        i, len;

    for (i = 0, len = fauxCount; i < len; i++) {
        map[i] = _.zipWith([0, 0, 0], delta, sub);
    }

    for (i, len = i + count; i < len; i++) {
        map[i] = _.zipWith(map[i - 1], delta, add);
    }

    for (i, len = i + fauxCount; i < len; i++) {
        map[i] = _.zipWith(map[count + fauxCount - 1], delta, add);
    }

    return map;
}

function Scroller(element, options) {
    this.element = element;
    this.options = _.defaults({}, options, Scroller.defaults);
    this.items = _.toArray(this.element.children);

    this.transforms = new TrandformWheel(
        buildTransformMap([this.options.scrollStep, 0, 0], this.options.viewport, 1)
    );

    this.init();
}

Scroller.prototype.init = function () {
    _.forEach(this.items, function (child, i) {
        child.style.webkitTransform = getTransformStyle(this.transforms[i]);
    }, this);
};

Scroller.defaults = {
    viewport: 6,
    scrollStep: 190,
    scrollDuration: 200
};

Scroller.prototype.forward = function (long) {
    _.forEachRight(TWEEN.getAll(), function (tween) { tween.stop(); });
    this._scroll(Constants.FORWARD);
};

Scroller.prototype.backward = function () {
    _.forEachRight(TWEEN.getAll(), function (tween) { tween.stop(); });
    this._scroll(Constants.BACKWARD);
};

Scroller.prototype._scroll = function (direction) {
    var options = this.options,
        startTransforms = _.toArray(this.transforms),
        endTransforms = this.transforms.rotate(direction),
        startTime = performance.now();

    _.forEach(this.items, function (child, i, items) {

        var delta = _.map(_.zipWith(endTransforms[i], startTransforms[i], sub), Math.abs);

        new TWEEN.Tween(_.slice(startTransforms[i]))
            .to(
                endTransforms[i],
                _.sum(delta) > options.scrollStep ? 0 : options.scrollDuration
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function () {
                child.style.webkitTransform = getTransformStyle(this);
            })
            .onStop(function () {
                child.style.webkitTransform = getTransformStyle(endTransforms[i]);
            })
            .start(startTime);
    });

    requestAnimationFrame(function updateTweens() {
        TWEEN.update(performance.now());

        if (TWEEN.getAll().length) {
            requestAnimationFrame(updateTweens);
        }
    });
};

module.exports = Scroller;