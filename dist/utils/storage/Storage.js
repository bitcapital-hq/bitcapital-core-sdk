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
const LocalStorage_1 = require("./LocalStorage");
class StorageUtil {
    constructor(label, engine) {
        this.label = label;
        if (engine) {
            this.engine = engine;
        }
        else if (!engine && typeof process === 'object') {
            require('localstorage-polyfill');
            this.engine = global.localStorage;
        }
        else if (!engine && window && window.localStorage) {
            this.engine = new LocalStorage_1.default(window);
        }
        else {
            throw new Error('No storage util available');
        }
    }
    /**
     * Puts a new value in the storage.
     *
     * @param key The key to set the value in storage
     * @param value The value to be stored
     */
    put(key, val) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            if (val) {
                try {
                    value = JSON.stringify(val);
                }
                catch (error) {
                    // Ignore parsing error, it's not a valid JSON
                    value = val;
                }
            }
            // TODO: Use obfuscation technique such as Base64
            return this.engine.setItem(key, value);
        });
    }
    /**
     * Gets a value from the storage.
     *
     * @param key The key to fetch from storage
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.engine.getItem(key);
            if (value) {
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    // Ignore parsing error, it's not a valid JSON
                }
            }
            // TODO: Use obfuscation technique such as Base64
            return value;
        });
    }
    /**
     * Removes an item from the storage.
     *
     * @param key The key to be deleted from storage
     */
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.engine.removeItem(key);
        });
    }
    /**
     * Clears the storage.
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.engine.clear();
        });
    }
}
exports.default = StorageUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9zdG9yYWdlL1N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUEwQztBQUcxQztJQUdFLFlBQW1CLEtBQWEsRUFBRSxNQUEwQjtRQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUNqRCxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFJLE1BQWMsQ0FBQyxZQUFZLENBQUM7U0FDNUM7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDOUM7SUFFSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVE7O1lBQ3BDLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSTtvQkFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsOENBQThDO29CQUM5QyxLQUFLLEdBQUcsR0FBRyxDQUFDO2lCQUNiO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxHQUFXOztZQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUk7b0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCw4Q0FBOEM7aUJBQy9DO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsR0FBRyxDQUFDLEdBQVc7O1lBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxLQUFLOztZQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBRUY7QUExRUQsOEJBMEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL0xvY2FsU3RvcmFnZSc7XG5pbXBvcnQgeyBTdG9yYWdlVXRpbEVuZ2luZSB9IGZyb20gJy4vU3RvcmFnZVV0aWxFbmdpbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlVXRpbCB7XG4gIHByb3RlY3RlZCBlbmdpbmU6IFN0b3JhZ2VVdGlsRW5naW5lO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbDogc3RyaW5nLCBlbmdpbmU/OiBTdG9yYWdlVXRpbEVuZ2luZSkge1xuICAgIGlmIChlbmdpbmUpIHtcbiAgICAgIHRoaXMuZW5naW5lID0gZW5naW5lO1xuICAgIH0gZWxzZSBpZiAoIWVuZ2luZSAmJiB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlcXVpcmUoJ2xvY2Fsc3RvcmFnZS1wb2x5ZmlsbCcpO1xuICAgICAgdGhpcy5lbmdpbmUgPSAoZ2xvYmFsIGFzIGFueSkubG9jYWxTdG9yYWdlO1xuICAgIH0gZWxzZSBpZiAoIWVuZ2luZSAmJiB3aW5kb3cgJiYgd2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgTG9jYWxTdG9yYWdlKHdpbmRvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc3RvcmFnZSB1dGlsIGF2YWlsYWJsZScpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIFB1dHMgYSBuZXcgdmFsdWUgaW4gdGhlIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBzZXQgdGhlIHZhbHVlIGluIHN0b3JhZ2VcbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBzdG9yZWRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwdXQoa2V5OiBzdHJpbmcsIHZhbDogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHZhbHVlO1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIElnbm9yZSBwYXJzaW5nIGVycm9yLCBpdCdzIG5vdCBhIHZhbGlkIEpTT05cbiAgICAgICAgdmFsdWUgPSB2YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIG9iZnVzY2F0aW9uIHRlY2huaXF1ZSBzdWNoIGFzIEJhc2U2NFxuICAgIHJldHVybiB0aGlzLmVuZ2luZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSB2YWx1ZSBmcm9tIHRoZSBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gZmV0Y2ggZnJvbSBzdG9yYWdlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHRoaXMuZW5naW5lLmdldEl0ZW0oa2V5KTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWdub3JlIHBhcnNpbmcgZXJyb3IsIGl0J3Mgbm90IGEgdmFsaWQgSlNPTlxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSBvYmZ1c2NhdGlvbiB0ZWNobmlxdWUgc3VjaCBhcyBCYXNlNjRcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBiZSBkZWxldGVkIGZyb20gc3RvcmFnZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbChrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS5jbGVhcigpO1xuICB9XG5cbn1cbiJdfQ==