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
class Asset extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.code = undefined;
        this.name = undefined;
        this.issuer = undefined;
        this.wallets = undefined;
        this.payments = undefined;
        Object.assign(this, data);
        this.issuer = data.issuer && new __1.Wallet(data.issuer);
        this.wallets = data.wallets && data.wallets.map(wallet => new __1.Wallet(wallet));
        this.payments = data.payments && data.payments.map(payments => new __1.Payment(payments));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Asset.prototype, "code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
exports.Asset = Asset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0Fzc2V0L0Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQThGO0FBQzlGLHFEQUF5RDtBQVV6RCxXQUFtQixTQUFRLGFBQVM7SUFTbEMsWUFBWSxJQUEwQjtRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFUQSxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFFeEMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixZQUFPLEdBQWMsU0FBUyxDQUFDO1FBQy9CLGFBQVEsR0FBZSxTQUFTLENBQUM7UUFLL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksVUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksV0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNGO0FBakJlO0lBQWIsNEJBQVUsRUFBRTs7bUNBQTBCO0FBRXpCO0lBQWIsNEJBQVUsRUFBRTs7bUNBQTJCO0FBSDFDLHNCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBXYWxsZXQsIFdhbGxldFNjaGVtYSwgUGF5bWVudFNjaGVtYSwgUGF5bWVudCB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNPcHRpb25hbCwgSXNOb3RFbXB0eSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBc3NldFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgaXNzdWVyOiBXYWxsZXRTY2hlbWE7XG4gIHdhbGxldHM/OiBXYWxsZXRTY2hlbWFbXTtcbiAgcGF5bWVudHM/OiBQYXltZW50U2NoZW1hW107XG59XG5cbmV4cG9ydCBjbGFzcyBBc3NldCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEFzc2V0U2NoZW1hIHtcbiAgQElzTm90RW1wdHkoKSBjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKSBuYW1lPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIGlzc3VlcjogV2FsbGV0ID0gdW5kZWZpbmVkO1xuICB3YWxsZXRzPzogV2FsbGV0W10gPSB1bmRlZmluZWQ7XG4gIHBheW1lbnRzPzogUGF5bWVudFtdID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QXNzZXRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5pc3N1ZXIgPSBkYXRhLmlzc3VlciAmJiBuZXcgV2FsbGV0KGRhdGEuaXNzdWVyKTtcbiAgICB0aGlzLndhbGxldHMgPSBkYXRhLndhbGxldHMgJiYgZGF0YS53YWxsZXRzLm1hcCh3YWxsZXQgPT4gbmV3IFdhbGxldCh3YWxsZXQpKTtcbiAgICB0aGlzLnBheW1lbnRzID0gZGF0YS5wYXltZW50cyAmJiBkYXRhLnBheW1lbnRzLm1hcChwYXltZW50cyA9PiBuZXcgUGF5bWVudChwYXltZW50cykpO1xuICB9XG59XG4iXX0=