const BluebirdPromise = require('bluebird');
const logUpdate = require('log-update');
const figlet = require('figlet');
const PAD_LEFT = '::::: ';
const MAX_COLS = 80;


module.exports.clear = function(){ logUpdate.clear(); };
module.exports.write = function(text, { persist = true, prefix = PAD_LEFT } = {}){
    logUpdate(text);

    if (persist){
        logUpdate.done();
    } else {
        logUpdate.clear();
    }
};

module.exports.bannerText = function(text, { tagline = '' } = {}){
    const title = figlet.textSync(text, { font: 'Larry 3D' });

    if (!tagline){
        return title;
    }
    return `${title}\n${tagline}`;
};

module.exports.divider = function({ glyph = ':', terminalWidth = MAX_COLS, max = MAX_COLS } = {}){
    const text = glyph.repeat(Math.min(max, terminalWidth));
    logUpdate(text);
    logUpdate.done();
};

module.exports.createSpinner = function({ prefix = '', suffix = '' } = {}){
    return {
        prefix,
        suffix,
        isRunning: false,
        run: async function(){
            const frames = padFrames([
                { text: '⠋', ms: 80 },
                { text: '⠙', ms: 80 },
                { text: '⠹', ms: 80 },
                { text: '⠸', ms: 80 },
                { text: '⠼', ms: 80 },
                { text: '⠴', ms: 80 },
                { text: '⠦', ms: 80 },
                { text: '⠧', ms: 80 },
                { text: '⠇', ms: 80 },
                { text: '⠏', ms: 80 }
            ], this.prefix, this.suffix);

            if (!this.isRunning){ return logUpdate.clear(); }
            await printFrames(frames);
            return this.run();
        },
        start: function(){
            this.isRunning = true;
            this._ = this.run();
        },
        stop: function(){
            this.isRunning = false;
            return this._;
        }
    };
};

module.exports.coolguy = function({ prefix = '', suffix = '' } = {}){
    const frames = padFrames([
        { text: '( •_•)      ', ms: 250 },
        { text: '( •_•)>⌐■-■ ', ms: 250 },
        { text: '(⌐■_■)      ', ms: 500 }
    ], prefix, suffix);

    return printFrames(frames);
};

module.exports.tableflip = function({ prefix = '', suffix = '' } = {}){
    const frames = padFrames([
        { text: '(°_°) ┳━┳', ms: 500 },
        { text: '(╯°□°)╯ ︵ ┻━┻ ', ms: 100 },
        { text: '(╯°□°)╯ ︵  ┻━┻ ', ms: 100 },
        { text: '(╯°□°)╯ ︵   ┻━┻ ', ms: 100 },
        { text: '(╯°□°)╯ ︵    ┻━┻ ', ms: 100 },
        { text: '(╯°□°)╯ ︵     ┻━┻ ', ms: 100 },
        { text: '(°_°)           ┻━┻ ', ms: 100 },
        { text: '(°_°)            ┻━┻ ', ms: 100 },
        { text: '(°_°)             ┻━┻ ', ms: 100 },
        { text: '(°_°)              XXX', ms: 100 },
        { text: '(°_°)               xx', ms: 100 },
        { text: '(°_°)                _', ms: 100 },
        { text: '╰ (°u°)╯              ', ms: 1000 }
    ], prefix, suffix);

    return printFrames(frames);
};


// INTERNAL UTILS /////////////////////////////////////////////////////////////
async function printFrames(frames, { persist = false } = {}){
    const frame = frames.shift();

    if (!frame){
        return persist ? logUpdate.done() : logUpdate.clear();
    }
    logUpdate(frame.text);
    await BluebirdPromise.delay(frame.ms);
    await printFrames(frames, { persist });
}

function padFrames(frames, prefix, suffix){
    if (!isPrintable(prefix) && !isPrintable(suffix)){
        return frames;
    }
    return frames.map(withFramePadding(prefix, suffix));
}

function withFramePadding(prefix, suffix){
    return function(frame){
        frame.text = `${prefix} ${frame.text} ${suffix}`.trim();
        return frame;
    };
}

function isPrintable(x){
    if (x === ''){ return false; }
    return typeof x === 'string' || typeof x === 'number';
}
