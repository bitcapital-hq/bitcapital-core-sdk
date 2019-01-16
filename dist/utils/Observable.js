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
            const wrapper = () => this.listeners.map(observable => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFjQTs7R0FFRztBQUNIO0lBT0UsWUFBWSxVQUE2QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsVUFBb0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXLENBQUMsVUFBb0I7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVSxNQUFNLENBQUMsS0FBYyxFQUFFLElBQVU7O1lBQzVDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN0QixVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQy9CLENBQUM7S0FBQTs7QUFuREQsbUVBQW1FO0FBQ2xELCtCQUFvQixHQUFHLEVBQUUsQ0FBQztBQUw3Qyw2QkF3REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhlIGludGVyZmFjZSB0byB3YXRjaCBPYnNlcnZhYmxlIGNoYW5nZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE9ic2VydmVyIHtcclxuICB1cGRhdGU6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG9wdGlvbnMgZm9yIE9ic2VydmFibGUgY29uc3RydWN0b3IuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGVPcHRpb25zIHtcclxuICBhc3luYz86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBPYnNlcnZhYmxlIHBhdHRlcm4gdXRpbGl0eS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmFibGUge1xyXG4gIGxpc3RlbmVyczogT2JzZXJ2ZXJbXTtcclxuICBvcHRpb25zOiBPYnNlcnZhYmxlT3B0aW9ucztcclxuXHJcbiAgLy8gVGhlIHRpbWVvdXQgdG8gd2FpdCB1bnRpbGwgbm90aWZ5aW5nIHN1YnNjcmliZXJzIGluIG1pbGxpc2Vjb25kc1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgTk9USUZJQ0FUSU9OX1RJTUVPVVQgPSAxMDtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JzZXJ2YWJsZU9wdGlvbnMgPSB7IGFzeW5jOiB0cnVlIH0pIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFjZSB0byBiZSBub3RpZmllZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gob2JzZXJ2YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgcHVibGljIHVuc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMuaW5kZXhPZihvYnNlcnZhYmxlKSA+PSAwKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZSh0aGlzLmxpc3RlbmVycy5pbmRleE9mKG9ic2VydmFibGUpLCAxKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3RpZmllcyBhbGwgbGlzdGVuZXJzIGFib3V0IGFuIGV2ZW50IHVwZGF0ZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lXHJcbiAgICogQHBhcmFtIHthbnl9IFtkYXRhXSBUaGUgZXZlbnQgZGF0YVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgbm90aWZ5KGV2ZW50Pzogc3RyaW5nLCBkYXRhPzogYW55KTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSAoKSA9PlxyXG4gICAgICB0aGlzLmxpc3RlbmVycy5tYXAob2JzZXJ2YWJsZSA9PiB7XHJcbiAgICAgICAgb2JzZXJ2YWJsZS51cGRhdGUoZXZlbnQsIGRhdGEpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFzeW5jKSB7XHJcbiAgICAgIHNldFRpbWVvdXQod3JhcHBlciwgT2JzZXJ2YWJsZS5OT1RJRklDQVRJT05fVElNRU9VVCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cmFwcGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmxlbmd0aDtcclxuICB9XHJcbn1cclxuIl19