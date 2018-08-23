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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9XYWxsZXQvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQTBDO0FBTWpDLHFCQU5BLHVCQUFVLENBTUE7QUFMbkIsMEJBQWdEO0FBR2hELHFEQUFxRDtBQVdyRCxZQUE0QixTQUFRLGFBQVM7SUFXM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFUZCxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBRzdCLFNBQUksR0FBMEMsU0FBUyxDQUFDO1FBRXhELFNBQUksR0FBbUIsU0FBUyxDQUFDO1FBQ2pDLGFBQVEsR0FBcUIsU0FBUyxDQUFDO1FBS3JDLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFkQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLHVCQUFVLENBQUM7O29DQUNVO0FBRzdCO0lBREMsNEJBQVUsRUFBRTs7b0NBQzJDO0FBTjFELHlCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcbmltcG9ydCB7IFdhbGxldFR5cGUgfSBmcm9tIFwiLi9XYWxsZXRUeXBlXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgU3RlbGxhcldhbGxldERhdGEsIEJhbmtpbmdXYWxsZXREYXRhIH0gZnJvbSBcIi4vV2FsbGV0RGF0YVwiO1xuaW1wb3J0IHsgV2FsbGV0QmFsYW5jZSB9IGZyb20gXCIuL1dhbGxldEJhbGFuY2VcIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IHsgV2FsbGV0VHlwZSwgU3RlbGxhcldhbGxldERhdGEsIEJhbmtpbmdXYWxsZXREYXRhLCBXYWxsZXRCYWxhbmNlIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2FsbGV0U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgdHlwZTogV2FsbGV0VHlwZTtcbiAgZGF0YTogU3RlbGxhcldhbGxldERhdGEgfCBCYW5raW5nV2FsbGV0RGF0YTtcbiAgdXNlcj86IFVzZXIgfCBzdHJpbmc7XG4gIGJhbGFuY2VzPzogV2FsbGV0QmFsYW5jZVtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBXYWxsZXRTY2hlbWEge1xuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oV2FsbGV0VHlwZSlcbiAgdHlwZTogV2FsbGV0VHlwZSA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIGRhdGE6IFN0ZWxsYXJXYWxsZXREYXRhIHwgQmFua2luZ1dhbGxldERhdGEgPSB1bmRlZmluZWQ7XG5cbiAgdXNlcj86IFVzZXIgfCBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIGJhbGFuY2VzPzogV2FsbGV0QmFsYW5jZVtdID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8V2FsbGV0U2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xuICB9XG59XG4iXX0=