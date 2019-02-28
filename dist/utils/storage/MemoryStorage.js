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
class MemoryStorage {
    constructor() {
        this.data = {};
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[key] = value;
            return value;
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data[key];
        });
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.data[key];
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = {};
        });
    }
}
exports.default = MemoryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5U3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9zdG9yYWdlL01lbW9yeVN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLE1BQXFCLGFBQWE7SUFBbEM7UUFDWSxTQUFJLEdBQVEsRUFBRSxDQUFDO0lBZTNCLENBQUM7SUFiTyxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7O1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBQ0ssT0FBTyxDQUFDLEdBQVc7O1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFDSyxVQUFVLENBQUMsR0FBVzs7WUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUNLLEtBQUs7O1lBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUFoQkQsZ0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZVV0aWxFbmdpbmUgfSBmcm9tIFwiLi9TdG9yYWdlVXRpbEVuZ2luZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW1vcnlTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZVV0aWxFbmdpbmUge1xuICBwcm90ZWN0ZWQgZGF0YTogYW55ID0ge307XG5cbiAgYXN5bmMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgYXN5bmMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuICB9XG4gIGFzeW5jIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBkZWxldGUgdGhpcy5kYXRhW2tleV07XG4gIH1cbiAgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kYXRhID0ge307XG4gIH1cbn1cbiJdfQ==