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
    constructor(data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9XYWxsZXQvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBV1k7QUFFWixxREFBcUQ7QUFFckQsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLHlDQUF5QixDQUFBO0lBQ3pCLCtCQUFlLENBQUE7SUFDZixpQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDeEIscUNBQW1CLENBQUE7SUFDbkIsK0JBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6QjtBQWVELFlBQW9CLFNBQVEsYUFBUztJQWtCbkMsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksU0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGVBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzVHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksV0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNGO0FBMUJDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsWUFBWSxDQUFDOztzQ0FDQTtBQUlyQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGNBQWMsQ0FBQzs7d0NBQ0U7QUFQM0Isd0JBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQmFzZU1vZGVsLFxuICBCYXNlTW9kZWxTY2hlbWEsXG4gIFVzZXJTY2hlbWEsXG4gIEFzc2V0U2NoZW1hLFxuICBUcmFuc2FjdGlvblNjaGVtYSxcbiAgUGF5bWVudFNjaGVtYSxcbiAgVXNlcixcbiAgQXNzZXQsXG4gIFRyYW5zYWN0aW9uLFxuICBQYXltZW50XG59IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgU3RlbGxhcldhbGxldERhdGEsIENhcmRzV2FsbGV0RGF0YSwgV2FsbGV0QmFsYW5jZSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0gfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIFdhbGxldFN0YXR1cyB7XG4gIFBFTkRJTkcgPSBcInBlbmRpbmdcIixcbiAgUkVHSVNURVJFRCA9IFwicmVnaXN0ZXJlZFwiLFxuICBSRUFEWSA9IFwicmVhZHlcIixcbiAgRkFJTEVEID0gXCJmYWlsZWRcIlxufVxuXG5leHBvcnQgZW51bSBXYWxsZXRQcm92aWRlciB7XG4gIENEVF9DQVJEUyA9IFwiY2FyZHNcIixcbiAgTk9ORSA9IFwibm9uZVwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2FsbGV0U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgc3RhdHVzOiBXYWxsZXRTdGF0dXM7XG4gIHByb3ZpZGVyOiBXYWxsZXRQcm92aWRlcjtcbiAgc3RlbGxhcjogU3RlbGxhcldhbGxldERhdGE7XG4gIGFkZGl0aW9uYWxEYXRhPzogQ2FyZHNXYWxsZXREYXRhO1xuICBiYWxhbmNlcz86IFdhbGxldEJhbGFuY2VbXTtcbiAgdXNlcjogVXNlclNjaGVtYTtcbiAgaXNzdWVkQXNzZXRzOiBBc3NldFNjaGVtYVtdO1xuICBhc3NldHM6IEFzc2V0U2NoZW1hW107XG4gIHRyYW5zYWN0aW9uczogVHJhbnNhY3Rpb25TY2hlbWFbXTtcbiAgcmVjZWl2ZWQ6IFBheW1lbnRTY2hlbWFbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGxldCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFdhbGxldFNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShXYWxsZXRTdGF0dXMpXG4gIHN0YXR1czogV2FsbGV0U3RhdHVzO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShXYWxsZXRQcm92aWRlcilcbiAgcHJvdmlkZXI6IFdhbGxldFByb3ZpZGVyO1xuXG4gIHN0ZWxsYXI6IFN0ZWxsYXJXYWxsZXREYXRhO1xuICBhZGRpdGlvbmFsRGF0YT86IENhcmRzV2FsbGV0RGF0YTtcbiAgYmFsYW5jZXM/OiBXYWxsZXRCYWxhbmNlW107XG4gIHVzZXI6IFVzZXI7XG4gIGlzc3VlZEFzc2V0czogQXNzZXRbXTtcbiAgYXNzZXRzOiBBc3NldFtdO1xuICB0cmFuc2FjdGlvbnM6IFRyYW5zYWN0aW9uW107XG4gIHJlY2VpdmVkOiBQYXltZW50W107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxXYWxsZXRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy51c2VyID0gZGF0YS51c2VyICYmIG5ldyBVc2VyKGRhdGEudXNlcik7XG4gICAgdGhpcy5pc3N1ZWRBc3NldHMgPSBkYXRhLmlzc3VlZEFzc2V0cyAmJiBkYXRhLmlzc3VlZEFzc2V0cy5tYXAoaXNzdWVkQXNzZXRzID0+IG5ldyBBc3NldChpc3N1ZWRBc3NldHMpKTtcbiAgICB0aGlzLmFzc2V0cyA9IGRhdGEuYXNzZXRzICYmIGRhdGEuYXNzZXRzLm1hcChhc3NldCA9PiBuZXcgQXNzZXQoYXNzZXQpKTtcbiAgICB0aGlzLnRyYW5zYWN0aW9ucyA9IGRhdGEudHJhbnNhY3Rpb25zICYmIGRhdGEudHJhbnNhY3Rpb25zLm1hcCh0cmFuc2FjdGlvbiA9PiBuZXcgVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pKTtcbiAgICB0aGlzLnJlY2VpdmVkID0gZGF0YS5yZWNlaXZlZCAmJiBkYXRhLnJlY2VpdmVkLm1hcChyZWNlaXZlZCA9PiBuZXcgUGF5bWVudChyZWNlaXZlZCkpO1xuICB9XG59XG4iXX0=