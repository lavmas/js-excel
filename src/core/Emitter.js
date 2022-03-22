export class Emitter {
    constructor() {
        this.listeners = {};
    }
    // notify, dispatch, fire, trigger.
    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false;
        }
        this.listeners[eventName].forEach(listener => {
            listener(...args);
        });
        return true;
    }
    // listen, on.
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        // Возвращаем функцию, где можем отписаться от этого события.
        return () => {
            this.listeners[eventName] = this.listeners[eventName]
                .filter(listener => listener !== fn);
        };
    }
}