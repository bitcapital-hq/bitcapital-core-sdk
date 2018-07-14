/**
 * The interface to watch Observable changes.
 */
export interface Observer {
    update: Function;
}
/**
 * The options for Observable constructor.
 */
export interface ObservableOptions {
    async?: boolean;
}
/**
 * A simple Observable pattern utility.
 */
export default class Observable {
    listeners: Observer[];
    options: ObservableOptions;
    protected static NOTIFICATION_TIMEOUT: number;
    constructor(options?: ObservableOptions);
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    subscribe(observable: Observer): void;
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(observable: Observer): boolean;
    /**
     * Notifies all listeners about an event update.
     *
     * @param {string} [event] The event name
     * @param {any} [data] The event data
     *
     * @returns {number}
     */
    notify(event?: string, data?: any): Promise<number>;
}
