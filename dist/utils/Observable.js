"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple Observable pattern utility.
 */
class Observable {
    constructor(options = { async: true }) {
        this.options = options;
        this.listeners = [];
    }
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    subscribe(observable) {
        this.listeners.push(observable);
    }
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(observable) {
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
    notify(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const wrapper = () => this.listeners.map((observable) => {
                observable.update(event, data);
            });
            if (this.options.async) {
                setTimeout(wrapper, Observable.NOTIFICATION_TIMEOUT);
            }
            else {
                wrapper();
            }
            return this.listeners.length;
        });
    }
}
// The timeout to wait untill notifying subscribers in milliseconds
Observable.NOTIFICATION_TIMEOUT = 10;
exports.default = Observable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFjQTs7R0FFRztBQUNIO0lBT0UsWUFBWSxVQUE2QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsVUFBb0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXLENBQUMsVUFBb0I7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVSxNQUFNLENBQUMsS0FBYyxFQUFFLElBQVU7O1lBQzVDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ3RELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUN0RDtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMvQixDQUFDO0tBQUE7O0FBbERELG1FQUFtRTtBQUNsRCwrQkFBb0IsR0FBRyxFQUFFLENBQUM7QUFMN0MsNkJBdURDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgaW50ZXJmYWNlIHRvIHdhdGNoIE9ic2VydmFibGUgY2hhbmdlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPYnNlcnZlciB7XG4gIHVwZGF0ZTogRnVuY3Rpb247XG59XG5cbi8qKlxuICogVGhlIG9wdGlvbnMgZm9yIE9ic2VydmFibGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZU9wdGlvbnMge1xuICBhc3luYz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBzaW1wbGUgT2JzZXJ2YWJsZSBwYXR0ZXJuIHV0aWxpdHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmFibGUge1xuICBsaXN0ZW5lcnM6IE9ic2VydmVyW107XG4gIG9wdGlvbnM6IE9ic2VydmFibGVPcHRpb25zO1xuXG4gIC8vIFRoZSB0aW1lb3V0IHRvIHdhaXQgdW50aWxsIG5vdGlmeWluZyBzdWJzY3JpYmVycyBpbiBtaWxsaXNlY29uZHNcbiAgcHJvdGVjdGVkIHN0YXRpYyBOT1RJRklDQVRJT05fVElNRU9VVCA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9ic2VydmFibGVPcHRpb25zID0geyBhc3luYzogdHJ1ZSB9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSBmb3IgdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFjZSB0byBiZSBub3RpZmllZFxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMuaW5kZXhPZihvYnNlcnZhYmxlKSA+PSAwKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5zcGxpY2UodGhpcy5saXN0ZW5lcnMuaW5kZXhPZihvYnNlcnZhYmxlKSwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIGFsbCBsaXN0ZW5lcnMgYWJvdXQgYW4gZXZlbnQgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge2FueX0gW2RhdGFdIFRoZSBldmVudCBkYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbm90aWZ5KGV2ZW50Pzogc3RyaW5nLCBkYXRhPzogYW55KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCB3cmFwcGVyID0gKCkgPT4gdGhpcy5saXN0ZW5lcnMubWFwKChvYnNlcnZhYmxlKSA9PiB7XG4gICAgICBvYnNlcnZhYmxlLnVwZGF0ZShldmVudCwgZGF0YSk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFzeW5jKSB7XG4gICAgICBzZXRUaW1lb3V0KHdyYXBwZXIsIE9ic2VydmFibGUuTk9USUZJQ0FUSU9OX1RJTUVPVVQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmxlbmd0aDtcbiAgfVxufVxuIl19