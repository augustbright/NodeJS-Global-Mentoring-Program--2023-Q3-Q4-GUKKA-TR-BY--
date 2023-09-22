class EventEmitter {
    listeners = {};

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        if (!this.listeners[eventName]) return;

        this.listeners[eventName] = this.listeners[eventName].filter(
            (listener) => listener !== fn
        );
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        const self = this;
        this.addListener(eventName, function handler(...args) {
            fn(...args);
            self.off(eventName, handler);
        });
    }

    emit(eventName, ...args) {
        if (!this.listeners[eventName]) return;

        for (const listener of this.listeners[eventName]) {
            listener(...args);
        }
    }

    listenerCount(eventName) {
        if (!this.listeners[eventName]) return 0;

        return this.listeners[eventName].length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}

module.exports = EventEmitter;