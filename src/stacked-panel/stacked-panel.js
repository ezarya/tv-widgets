(function (global) {

    var StackedPanel = global.StackedPanel = function StackedPanel(el, options) {
        this.el = el;
        this.panels = this.el.querySelectorAll('*');
        this.options = options;
        // this.scrollHeight = options.offsets.reduce(function (r, w) {
        //     return r + w;
        // }, 0);
        // this.scrollOffset = 0;
        this.position = 0;
        this.rects = [];

        this._calculateRects();
        this._align(this.position);
    };

    StackedPanel.prototype._getScrollOffset = function (position) {
        return this.options.scrollOffsets.reduce(function (res, o, i) {
            if (i < position) {
                return res + o;
            }
            return res;
        }, 0)
    };

    StackedPanel.prototype._calculateRects = function () {
        var panels = this.panels;

        for (i = 0, len = panels.length; i < len; i++) {
            this.rects.push(
                panels[i].getBoundingClientRect()
            );
        }
    };

    StackedPanel.prototype._align = function (position) {
        var scrollOffset = this._getScrollOffset(position),
            currentOffset = 0,
            panelOffset,
            i = 0, len = this.panels.length;

        for (; i < len; i++) {
            this.panels[i].style.webkitTransform = 'translate3d(0px, ' + (
                Math.max(-this.rects[i].height, Math.min(currentOffset - scrollOffset, this.options.viewport))
            ) + 'px, 0px)';
            currentOffset += this.rects[i].height;
        }
    };

    StackedPanel.prototype.move = function (direction) {
        if (direction === StackedPanel.UP) {
            if (this.position > 0) {
                this._align(--this.position);
            }
        } else if (direction === StackedPanel.DOWN) {
            if (this.position < this.options.scrollOffsets.length) {
                this._align(++this.position);
            }
        }
    };

    StackedPanel.UP = 0;
    StackedPanel.DOWN = 1;

})(this);