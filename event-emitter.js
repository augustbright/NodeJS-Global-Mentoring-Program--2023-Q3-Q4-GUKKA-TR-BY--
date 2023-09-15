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

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));


class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const result = await asyncFunc(...args);
        this.emit('end');
        return result;
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

withTime.execute(getPost, 1)
    .then((post) => {
        console.log('post is', post);
    });

async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await response.json();
    return post;
}