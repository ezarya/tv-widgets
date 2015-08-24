var Scroller = require('./scroller.js');

var scroller = null;

function runApp(container) {
    scroller = global.scroller = new Scroller(container, {
        viewport: 6,
        scrollStep: 190
    });
}

function handleEvent(e) {
    if (e.type === 'keydown') {
        switch (e.keyCode) {
            case 37:
                scroller.backward();
                break;
            case 39:
                scroller.forward();
                break;
            default:
                break;
        }
    }
}

module.exports = App = {
    run: runApp,
    handleEvent: handleEvent
};
