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

  // The timeout to wait untill notifying subscribers in milliseconds
  protected static NOTIFICATION_TIMEOUT = 10;

  constructor(options: ObservableOptions = { async: true }) {
    this.options = options;
    this.listeners = [];
  }

  /**
   * Subscribe for updates.
   *
   * @param {Observer} observable The instace to be notified
   */
  public subscribe(observable: Observer): void {
    this.listeners.push(observable);
  }

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners
   */
  public unsubscribe(observable: Observer): boolean {
    if (this.listeners.indexOf(observable) >= 0) {
      this.listeners.splice(this.listeners.indexOf(observable), 1);
      return true;
    }
    return false;
  }

  /**
   * Notifies all listeners about an event update.
   *
   * @param {string} [event] The event name
   * @param {any} [data] The event data
   *
   * @returns {number}
   */
  public async notify(event?: string, data?: any): Promise<number> {
    const wrapper = () => this.listeners.map((observable) => {
      observable.update(event, data);
    });

    if (this.options.async) {
      setTimeout(wrapper, Observable.NOTIFICATION_TIMEOUT);
    } else {
      wrapper();
    }

    return this.listeners.length;
  }
}
