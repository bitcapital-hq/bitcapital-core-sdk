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
        else if (!engine && typeof process === "object" && process.title === "node") {
            require("localstorage-polyfill");
            this.engine = global.localStorage;
        }
        else if (!engine && window && window.localStorage) {
            this.engine = new LocalStorage_1.default(window);
        }
        else {
            throw new Error("No storage util available");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9zdG9yYWdlL1N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUEwQztBQUcxQyxNQUFxQixXQUFXO0lBRzlCLFlBQW1CLEtBQWEsRUFBRSxNQUEwQjtRQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUM3RSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFJLE1BQWMsQ0FBQyxZQUFZLENBQUM7U0FDNUM7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVE7O1lBQ3BDLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSTtvQkFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsOENBQThDO29CQUM5QyxLQUFLLEdBQUcsR0FBRyxDQUFDO2lCQUNiO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxHQUFXOztZQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUk7b0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCw4Q0FBOEM7aUJBQy9DO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsR0FBRyxDQUFDLEdBQVc7O1lBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxLQUFLOztZQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBQ0Y7QUF4RUQsOEJBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgU3RvcmFnZVV0aWxFbmdpbmUgfSBmcm9tIFwiLi9TdG9yYWdlVXRpbEVuZ2luZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZVV0aWwge1xyXG4gIHByb3RlY3RlZCBlbmdpbmU6IFN0b3JhZ2VVdGlsRW5naW5lO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZywgZW5naW5lPzogU3RvcmFnZVV0aWxFbmdpbmUpIHtcclxuICAgIGlmIChlbmdpbmUpIHtcclxuICAgICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XHJcbiAgICB9IGVsc2UgaWYgKCFlbmdpbmUgJiYgdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy50aXRsZSA9PT0gXCJub2RlXCIpIHtcclxuICAgICAgcmVxdWlyZShcImxvY2Fsc3RvcmFnZS1wb2x5ZmlsbFwiKTtcclxuICAgICAgdGhpcy5lbmdpbmUgPSAoZ2xvYmFsIGFzIGFueSkubG9jYWxTdG9yYWdlO1xyXG4gICAgfSBlbHNlIGlmICghZW5naW5lICYmIHdpbmRvdyAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgIHRoaXMuZW5naW5lID0gbmV3IExvY2FsU3RvcmFnZSh3aW5kb3cpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3RvcmFnZSB1dGlsIGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1dHMgYSBuZXcgdmFsdWUgaW4gdGhlIHN0b3JhZ2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gc2V0IHRoZSB2YWx1ZSBpbiBzdG9yYWdlXHJcbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBzdG9yZWRcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcHV0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAvLyBJZ25vcmUgcGFyc2luZyBlcnJvciwgaXQncyBub3QgYSB2YWxpZCBKU09OXHJcbiAgICAgICAgdmFsdWUgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBVc2Ugb2JmdXNjYXRpb24gdGVjaG5pcXVlIHN1Y2ggYXMgQmFzZTY0XHJcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYSB2YWx1ZSBmcm9tIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGZldGNoIGZyb20gc3RvcmFnZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCB0aGlzLmVuZ2luZS5nZXRJdGVtKGtleSk7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vIElnbm9yZSBwYXJzaW5nIGVycm9yLCBpdCdzIG5vdCBhIHZhbGlkIEpTT05cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IFVzZSBvYmZ1c2NhdGlvbiB0ZWNobmlxdWUgc3VjaCBhcyBCYXNlNjRcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGJlIGRlbGV0ZWQgZnJvbSBzdG9yYWdlXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGRlbChrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZW5naW5lLnJlbW92ZUl0ZW0oa2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyB0aGUgc3RvcmFnZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuIl19