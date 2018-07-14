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
class LocalStorage {
    constructor(context) {
        this.context = context;
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return window.localStorage.setItem(key, value);
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return window.localStorage.getItem(key);
        });
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return window.localStorage.removeItem(key);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return window.localStorage.clear();
        });
    }
}
exports.default = LocalStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWxzL3N0b3JhZ2UvTG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTtJQUNFLFlBQXNCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQ3JDLENBQUM7SUFFSyxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7O1lBQ3RDLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUNLLE9BQU8sQ0FBQyxHQUFXOztZQUN2QixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUNLLFVBQVUsQ0FBQyxHQUFXOztZQUMxQixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUNLLEtBQUs7O1lBQ1QsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLENBQUM7S0FBQTtDQUNGO0FBaEJELCtCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VVdGlsRW5naW5lIH0gZnJvbSAnLi9TdG9yYWdlVXRpbEVuZ2luZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZSBpbXBsZW1lbnRzIFN0b3JhZ2VVdGlsRW5naW5lIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbnRleHQ6IFdpbmRvdykge1xuICB9XG5cbiAgYXN5bmMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuICBhc3luYyBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cbiAgYXN5bmMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuICBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICB9XG59XG4iXX0=