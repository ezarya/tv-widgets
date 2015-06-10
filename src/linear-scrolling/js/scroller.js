var _ = require('lodash');
var TWEEN = require('tween.js');

function getTransformStyle(coords) {
    return 'translate3d(' + [
        coords[0],
        coords[1],
        coords[2]
    ].join('px,') + ')';
}

function Scroller(element, options) {
    this.element = element;
    this.options = _.defaults({}, options, Scroller.defaults);
    this.wheel = _.range(0, this.options.viewport);
    this.transforms = new Array(this.options.viewport);
    this.items = _.toArray(this.element.children);

    this.init();
}

Scroller.prototype.init = function () {
    _.forEach(this.items, function (child, i) {
        this.transforms[i] = [this.wheel[i] * this.options.scrollStep, 0, 0];
        child.style.webkitTransform = getTransformStyle(this.transforms[i]);
    }, this);
};

Scroller.defaults = {
    viewport: 6,
    scrollStep: 190,
    scrollDuration: 200
};

Scroller.FORWARD = 0;
Scroller.BACKWARD = 1;

Scroller.prototype.forward = function () {
    _.forEachRight(TWEEN.getAll(), function (tween) { tween.stop(); });
    this._rotateWheel(Scroller.FORWARD);
    this._scroll(Scroller.FORWARD);
};

Scroller.prototype.backward = function () {
    _.forEachRight(TWEEN.getAll(), function (tween) { tween.stop(); });
    this._rotateWheel(Scroller.BACKWARD);
    this._scroll(Scroller.BACKWARD);
};

Scroller.prototype._scroll = function (direction) {
    var wheel = this.wheel,
        options = this.options,
        transforms = this.transforms,
        transformRatio = (direction === Scroller.FORWARD ? - 1 : 1),
        startTime = performance.now(),
        tweens = _.map(this.items, function (child, i, items) {
            function finishTween() {
                if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }

                transforms[i] = [_.indexOf(wheel, i) * options.scrollStep, 0, 0];
                child.style.webkitTransform = getTransformStyle(transforms[i]);
            }

            return new TWEEN.Tween(transforms[i])
                .to([
                    transforms[i][0] + transformRatio * this.options.scrollStep, 0, 0
                ], this.options.scrollDuration)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    child.style.webkitTransform = getTransformStyle(this);
                })
                .onStop(finishTween)
                .onComplete(finishTween)
                .start(startTime);
        }, this),
        rafId;

    rafId = requestAnimationFrame(function updateTweens(time) {
        rafId = requestAnimationFrame(updateTweens);

        TWEEN.update(time);
    });
};

Scroller.prototype._rotateWheel = function (direction) {
    var temp, tempIdx;

    if (direction === Scroller.FORWARD) {
        tempIdx = 0;
        temp = this.wheel[tempIdx];
        while (tempIdx < this.wheel.length - 1) {
            this.wheel[tempIdx] = this.wheel[++tempIdx];
        }
        this.wheel[this.wheel.length - 1] = temp;
    } else if (direction === Scroller.BACKWARD) {
        tempIdx = this.wheel.length - 1;
        temp = this.wheel[tempIdx];
        while (tempIdx > 0) {
            this.wheel[tempIdx] = this.wheel[--tempIdx];
        }
        this.wheel[0] = temp;
    }
    return this.wheel;
};

module.exports = Scroller;