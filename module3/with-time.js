const EventEmitter = require('./event-emitter');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const result = await asyncFunc(...args);
        this.emit('end');
        return result;
    }
}

module.exports = WithTime;