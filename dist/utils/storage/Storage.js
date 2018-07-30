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
        else if (!engine && typeof process === "object") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9zdG9yYWdlL1N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUEwQztBQUcxQztJQUdFLFlBQW1CLEtBQWEsRUFBRSxNQUEwQjtRQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUNqRCxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFJLE1BQWMsQ0FBQyxZQUFZLENBQUM7U0FDNUM7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVE7O1lBQ3BDLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSTtvQkFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsOENBQThDO29CQUM5QyxLQUFLLEdBQUcsR0FBRyxDQUFDO2lCQUNiO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxHQUFXOztZQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUk7b0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCw4Q0FBOEM7aUJBQy9DO2FBQ0Y7WUFFRCxpREFBaUQ7WUFDakQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsR0FBRyxDQUFDLEdBQVc7O1lBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxLQUFLOztZQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBQ0Y7QUF4RUQsOEJBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCB7IFN0b3JhZ2VVdGlsRW5naW5lIH0gZnJvbSBcIi4vU3RvcmFnZVV0aWxFbmdpbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZVV0aWwge1xuICBwcm90ZWN0ZWQgZW5naW5lOiBTdG9yYWdlVXRpbEVuZ2luZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZywgZW5naW5lPzogU3RvcmFnZVV0aWxFbmdpbmUpIHtcbiAgICBpZiAoZW5naW5lKSB7XG4gICAgICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcbiAgICB9IGVsc2UgaWYgKCFlbmdpbmUgJiYgdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJlcXVpcmUoXCJsb2NhbHN0b3JhZ2UtcG9seWZpbGxcIik7XG4gICAgICB0aGlzLmVuZ2luZSA9IChnbG9iYWwgYXMgYW55KS5sb2NhbFN0b3JhZ2U7XG4gICAgfSBlbHNlIGlmICghZW5naW5lICYmIHdpbmRvdyAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICB0aGlzLmVuZ2luZSA9IG5ldyBMb2NhbFN0b3JhZ2Uod2luZG93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3RvcmFnZSB1dGlsIGF2YWlsYWJsZVwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHV0cyBhIG5ldyB2YWx1ZSBpbiB0aGUgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIHNldCB0aGUgdmFsdWUgaW4gc3RvcmFnZVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIHN0b3JlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHB1dChrZXk6IHN0cmluZywgdmFsOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWdub3JlIHBhcnNpbmcgZXJyb3IsIGl0J3Mgbm90IGEgdmFsaWQgSlNPTlxuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2Ugb2JmdXNjYXRpb24gdGVjaG5pcXVlIHN1Y2ggYXMgQmFzZTY0XG4gICAgcmV0dXJuIHRoaXMuZW5naW5lLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBmZXRjaCBmcm9tIHN0b3JhZ2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5lbmdpbmUuZ2V0SXRlbShrZXkpO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJZ25vcmUgcGFyc2luZyBlcnJvciwgaXQncyBub3QgYSB2YWxpZCBKU09OXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIG9iZnVzY2F0aW9uIHRlY2huaXF1ZSBzdWNoIGFzIEJhc2U2NFxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGJlIGRlbGV0ZWQgZnJvbSBzdG9yYWdlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuZW5naW5lLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuZW5naW5lLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==