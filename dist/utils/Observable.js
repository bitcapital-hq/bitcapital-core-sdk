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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFjQTs7R0FFRztBQUNIO0lBT0UsWUFBWSxVQUE2QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsVUFBb0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXLENBQUMsVUFBb0I7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVSxNQUFNLENBQUMsS0FBYyxFQUFFLElBQVU7O1lBQzVDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN0QixVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQy9CLENBQUM7S0FBQTs7QUFuREQsbUVBQW1FO0FBQ2xELCtCQUFvQixHQUFHLEVBQUUsQ0FBQztBQUw3Qyw2QkF3REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBpbnRlcmZhY2UgdG8gd2F0Y2ggT2JzZXJ2YWJsZSBjaGFuZ2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9ic2VydmVyIHtcbiAgdXBkYXRlOiBGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBUaGUgb3B0aW9ucyBmb3IgT2JzZXJ2YWJsZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPYnNlcnZhYmxlT3B0aW9ucyB7XG4gIGFzeW5jPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBPYnNlcnZhYmxlIHBhdHRlcm4gdXRpbGl0eS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2YWJsZSB7XG4gIGxpc3RlbmVyczogT2JzZXJ2ZXJbXTtcbiAgb3B0aW9uczogT2JzZXJ2YWJsZU9wdGlvbnM7XG5cbiAgLy8gVGhlIHRpbWVvdXQgdG8gd2FpdCB1bnRpbGwgbm90aWZ5aW5nIHN1YnNjcmliZXJzIGluIG1pbGxpc2Vjb25kc1xuICBwcm90ZWN0ZWQgc3RhdGljIE5PVElGSUNBVElPTl9USU1FT1VUID0gMTA7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JzZXJ2YWJsZU9wdGlvbnMgPSB7IGFzeW5jOiB0cnVlIH0pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YWNlIHRvIGJlIG5vdGlmaWVkXG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnNcbiAgICovXG4gIHB1YmxpYyB1bnN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxpc3RlbmVycy5pbmRleE9mKG9ic2VydmFibGUpID49IDApIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZSh0aGlzLmxpc3RlbmVycy5pbmRleE9mKG9ic2VydmFibGUpLCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTm90aWZpZXMgYWxsIGxpc3RlbmVycyBhYm91dCBhbiBldmVudCB1cGRhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lXG4gICAqIEBwYXJhbSB7YW55fSBbZGF0YV0gVGhlIGV2ZW50IGRhdGFcbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBub3RpZnkoZXZlbnQ/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHdyYXBwZXIgPSAoKSA9PlxuICAgICAgdGhpcy5saXN0ZW5lcnMubWFwKG9ic2VydmFibGUgPT4ge1xuICAgICAgICBvYnNlcnZhYmxlLnVwZGF0ZShldmVudCwgZGF0YSk7XG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXN5bmMpIHtcbiAgICAgIHNldFRpbWVvdXQod3JhcHBlciwgT2JzZXJ2YWJsZS5OT1RJRklDQVRJT05fVElNRU9VVCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMubGVuZ3RoO1xuICB9XG59XG4iXX0=