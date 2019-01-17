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
const __1 = require("..");
const class_validator_1 = require("class-validator");
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["PENDING"] = "pending";
    WalletStatus["REGISTERED"] = "registered";
    WalletStatus["READY"] = "ready";
    WalletStatus["FAILED"] = "failed";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
var WalletProvider;
(function (WalletProvider) {
    WalletProvider["CDT_CARDS"] = "cards";
    WalletProvider["NONE"] = "none";
})(WalletProvider = exports.WalletProvider || (exports.WalletProvider = {}));
class Wallet extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        Object.assign(this, data);
        this.user = data.user && new __1.User(data.user);
        this.issuedAssets = data.issuedAssets && data.issuedAssets.map(issuedAssets => new __1.Asset(issuedAssets));
        this.assets = data.assets && data.assets.map(asset => new __1.Asset(asset));
        this.transactions = data.transactions && data.transactions.map(transaction => new __1.Transaction(transaction));
        this.received = data.received && data.received.map(received => new __1.Payment(received));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(WalletStatus),
    __metadata("design:type", String)
], Wallet.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(WalletProvider),
    __metadata("design:type", String)
], Wallet.prototype, "provider", void 0);
exports.Wallet = Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9XYWxsZXQvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBV1k7QUFFWixxREFBcUQ7QUFFckQsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLHlDQUF5QixDQUFBO0lBQ3pCLCtCQUFlLENBQUE7SUFDZixpQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDeEIscUNBQW1CLENBQUE7SUFDbkIsK0JBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6QjtBQWVELFlBQW9CLFNBQVEsYUFBUztJQWtCbkMsWUFBWSxPQUE4QixFQUFFO1FBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLFFBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN4RyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksZUFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0NBQ0Y7QUExQkM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxZQUFZLENBQUM7O3NDQUNBO0FBSXJCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsY0FBYyxDQUFDOzt3Q0FDRTtBQVAzQix3QkE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCYXNlTW9kZWwsXG4gIEJhc2VNb2RlbFNjaGVtYSxcbiAgVXNlclNjaGVtYSxcbiAgQXNzZXRTY2hlbWEsXG4gIFRyYW5zYWN0aW9uU2NoZW1hLFxuICBQYXltZW50U2NoZW1hLFxuICBVc2VyLFxuICBBc3NldCxcbiAgVHJhbnNhY3Rpb24sXG4gIFBheW1lbnRcbn0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBTdGVsbGFyV2FsbGV0RGF0YSwgQ2FyZHNXYWxsZXREYXRhLCBXYWxsZXRCYWxhbmNlIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGVudW0gV2FsbGV0U3RhdHVzIHtcbiAgUEVORElORyA9IFwicGVuZGluZ1wiLFxuICBSRUdJU1RFUkVEID0gXCJyZWdpc3RlcmVkXCIsXG4gIFJFQURZID0gXCJyZWFkeVwiLFxuICBGQUlMRUQgPSBcImZhaWxlZFwiXG59XG5cbmV4cG9ydCBlbnVtIFdhbGxldFByb3ZpZGVyIHtcbiAgQ0RUX0NBUkRTID0gXCJjYXJkc1wiLFxuICBOT05FID0gXCJub25lXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYWxsZXRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBzdGF0dXM6IFdhbGxldFN0YXR1cztcbiAgcHJvdmlkZXI6IFdhbGxldFByb3ZpZGVyO1xuICBzdGVsbGFyOiBTdGVsbGFyV2FsbGV0RGF0YTtcbiAgYWRkaXRpb25hbERhdGE/OiBDYXJkc1dhbGxldERhdGE7XG4gIGJhbGFuY2VzPzogV2FsbGV0QmFsYW5jZVtdO1xuICB1c2VyPzogVXNlclNjaGVtYTtcbiAgaXNzdWVkQXNzZXRzPzogQXNzZXRTY2hlbWFbXTtcbiAgYXNzZXRzPzogQXNzZXRTY2hlbWFbXTtcbiAgdHJhbnNhY3Rpb25zPzogVHJhbnNhY3Rpb25TY2hlbWFbXTtcbiAgcmVjZWl2ZWQ/OiBQYXltZW50U2NoZW1hW107XG59XG5cbmV4cG9ydCBjbGFzcyBXYWxsZXQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBXYWxsZXRTY2hlbWEge1xuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oV2FsbGV0U3RhdHVzKVxuICBzdGF0dXM6IFdhbGxldFN0YXR1cztcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oV2FsbGV0UHJvdmlkZXIpXG4gIHByb3ZpZGVyOiBXYWxsZXRQcm92aWRlcjtcblxuICBzdGVsbGFyOiBTdGVsbGFyV2FsbGV0RGF0YTtcbiAgYWRkaXRpb25hbERhdGE/OiBDYXJkc1dhbGxldERhdGE7XG4gIGJhbGFuY2VzPzogV2FsbGV0QmFsYW5jZVtdO1xuICB1c2VyPzogVXNlcjtcbiAgaXNzdWVkQXNzZXRzPzogQXNzZXRbXTtcbiAgYXNzZXRzPzogQXNzZXRbXTtcbiAgdHJhbnNhY3Rpb25zPzogVHJhbnNhY3Rpb25bXTtcbiAgcmVjZWl2ZWQ/OiBQYXltZW50W107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxXYWxsZXRTY2hlbWE+ID0ge30pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLnVzZXIgPSBkYXRhLnVzZXIgJiYgbmV3IFVzZXIoZGF0YS51c2VyKTtcbiAgICB0aGlzLmlzc3VlZEFzc2V0cyA9IGRhdGEuaXNzdWVkQXNzZXRzICYmIGRhdGEuaXNzdWVkQXNzZXRzLm1hcChpc3N1ZWRBc3NldHMgPT4gbmV3IEFzc2V0KGlzc3VlZEFzc2V0cykpO1xuICAgIHRoaXMuYXNzZXRzID0gZGF0YS5hc3NldHMgJiYgZGF0YS5hc3NldHMubWFwKGFzc2V0ID0+IG5ldyBBc3NldChhc3NldCkpO1xuICAgIHRoaXMudHJhbnNhY3Rpb25zID0gZGF0YS50cmFuc2FjdGlvbnMgJiYgZGF0YS50cmFuc2FjdGlvbnMubWFwKHRyYW5zYWN0aW9uID0+IG5ldyBUcmFuc2FjdGlvbih0cmFuc2FjdGlvbikpO1xuICAgIHRoaXMucmVjZWl2ZWQgPSBkYXRhLnJlY2VpdmVkICYmIGRhdGEucmVjZWl2ZWQubWFwKHJlY2VpdmVkID0+IG5ldyBQYXltZW50KHJlY2VpdmVkKSk7XG4gIH1cbn1cbiJdfQ==