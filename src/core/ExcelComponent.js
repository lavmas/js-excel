import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter || null;
        this.unsubscribers = [];
        this.prepare();
    }

    /**
     * Возвращает шаблон компонента.
     * @return {string}
     */
    toHTML() {
        return '';
    }

    // Уведомляем слушателей.
    $emit(event, ...args) {
        this.emitter.emit(event, args);
    }

    // Подписываемся на события event.
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    init() {
        this.initDOMListeners();
    }

    prepare() {
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}
