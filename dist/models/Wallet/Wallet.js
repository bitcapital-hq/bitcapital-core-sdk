"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const WalletType_1 = require("./WalletType");
exports.WalletType = WalletType_1.WalletType;
const __1 = require("..");
const class_validator_1 = require("class-validator");
class Wallet extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.type = undefined;
        this.data = undefined;
        this.user = undefined;
        this.balances = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(WalletType_1.WalletType),
    __metadata("design:type", String)
], Wallet.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], Wallet.prototype, "data", void 0);
exports.default = Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9XYWxsZXQvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQTBDO0FBTWpDLHFCQU5BLHVCQUFVLENBTUE7QUFMbkIsMEJBQWdEO0FBR2hELHFEQUFxRDtBQVdyRCxZQUE0QixTQUFRLGFBQVM7SUFVM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFSZCxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBRWYsU0FBSSxHQUEwQyxTQUFTLENBQUM7UUFFdEUsU0FBSSxHQUFtQixTQUFTLENBQUM7UUFDakMsYUFBUSxHQUFxQixTQUFTLENBQUM7UUFLckMsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWJDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsdUJBQVUsQ0FBQzs7b0NBQ1U7QUFFZjtJQUFiLDRCQUFVLEVBQUU7O29DQUF5RDtBQUx4RSx5QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tIFwiLi4vVXNlci9Vc2VyXCI7XG5pbXBvcnQgeyBXYWxsZXRUeXBlIH0gZnJvbSBcIi4vV2FsbGV0VHlwZVwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IFN0ZWxsYXJXYWxsZXREYXRhLCBCYW5raW5nV2FsbGV0RGF0YSB9IGZyb20gXCIuL1dhbGxldERhdGFcIjtcbmltcG9ydCB7IFdhbGxldEJhbGFuY2UgfSBmcm9tIFwiLi9XYWxsZXRCYWxhbmNlXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0gfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCB7IFdhbGxldFR5cGUsIFN0ZWxsYXJXYWxsZXREYXRhLCBCYW5raW5nV2FsbGV0RGF0YSwgV2FsbGV0QmFsYW5jZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFdhbGxldFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIHR5cGU6IFdhbGxldFR5cGU7XG4gIGRhdGE6IFN0ZWxsYXJXYWxsZXREYXRhIHwgQmFua2luZ1dhbGxldERhdGE7XG4gIHVzZXI/OiBVc2VyIHwgc3RyaW5nO1xuICBiYWxhbmNlcz86IFdhbGxldEJhbGFuY2VbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgV2FsbGV0U2NoZW1hIHtcbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKFdhbGxldFR5cGUpXG4gIHR5cGU6IFdhbGxldFR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKSBkYXRhOiBTdGVsbGFyV2FsbGV0RGF0YSB8IEJhbmtpbmdXYWxsZXREYXRhID0gdW5kZWZpbmVkO1xuXG4gIHVzZXI/OiBVc2VyIHwgc3RyaW5nID0gdW5kZWZpbmVkO1xuICBiYWxhbmNlcz86IFdhbGxldEJhbGFuY2VbXSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFdhbGxldFNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19