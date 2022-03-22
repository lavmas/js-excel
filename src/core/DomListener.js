import {capitalize} from '@core/units';

export class DomListener {
    constructor($root, listeners) {
        if (!$root) {
            throw new Error('No $root provided for DomListener.');
        }
        this.$root = $root;
        this.listeners = listeners ? listeners : [];
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = this.getMethodName(listener);
            const name = this.name || '';
            if (!this[method]) {
                throw new Error(
                    'Method' + method + ' is not implemented in ' + name
                );
            }
            this[method] = this[method].bind(this);
            // addEventListener.
            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = this.getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }

    getMethodName(eventName) {
        return 'on' + capitalize(eventName);
    }
}
