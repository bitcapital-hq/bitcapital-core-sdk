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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9XYWxsZXQvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQTBDO0FBTWpDLHFCQU5BLHVCQUFVLENBTUE7QUFMbkIsMEJBQWdEO0FBR2hELHFEQUFxRDtBQVdyRCxZQUE0QixTQUFRLGFBQVM7SUFVM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFSZCxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBRWYsU0FBSSxHQUEwQyxTQUFTLENBQUM7UUFFdEUsU0FBSSxHQUFtQixTQUFTLENBQUM7UUFDakMsYUFBUSxHQUFxQixTQUFTLENBQUM7UUFLckMsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWJDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsdUJBQVUsQ0FBQzs7b0NBQ1U7QUFFZjtJQUFiLDRCQUFVLEVBQUU7O29DQUF5RDtBQUx4RSx5QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tIFwiLi4vVXNlci9Vc2VyXCI7XHJcbmltcG9ydCB7IFdhbGxldFR5cGUgfSBmcm9tIFwiLi9XYWxsZXRUeXBlXCI7XHJcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IFN0ZWxsYXJXYWxsZXREYXRhLCBCYW5raW5nV2FsbGV0RGF0YSB9IGZyb20gXCIuL1dhbGxldERhdGFcIjtcclxuaW1wb3J0IHsgV2FsbGV0QmFsYW5jZSB9IGZyb20gXCIuL1dhbGxldEJhbGFuY2VcIjtcclxuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNFbnVtIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IHsgV2FsbGV0VHlwZSwgU3RlbGxhcldhbGxldERhdGEsIEJhbmtpbmdXYWxsZXREYXRhLCBXYWxsZXRCYWxhbmNlIH07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdhbGxldFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgdHlwZTogV2FsbGV0VHlwZTtcclxuICBkYXRhPzogU3RlbGxhcldhbGxldERhdGEgfCBCYW5raW5nV2FsbGV0RGF0YTtcclxuICB1c2VyPzogVXNlciB8IHN0cmluZztcclxuICBiYWxhbmNlcz86IFdhbGxldEJhbGFuY2VbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgV2FsbGV0U2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzRW51bShXYWxsZXRUeXBlKVxyXG4gIHR5cGU6IFdhbGxldFR5cGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc05vdEVtcHR5KCkgZGF0YTogU3RlbGxhcldhbGxldERhdGEgfCBCYW5raW5nV2FsbGV0RGF0YSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgdXNlcj86IFVzZXIgfCBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgYmFsYW5jZXM/OiBXYWxsZXRCYWxhbmNlW10gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8V2FsbGV0U2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==