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
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["AUDIT"] = "audit";
    UserRole["MEDIATOR"] = "mediator";
    UserRole["CONSUMER"] = "consumer";
    UserRole["PUBLIC"] = "public";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.role = undefined;
        this.status = undefined;
        this.domain = undefined;
        this.password = undefined;
        this.consumer = undefined;
        this.wallets = undefined;
        this.credentials = undefined;
        this.virtual = undefined;
        Object.assign(this, data);
        this.consumer = data.consumer && new __1.Consumer(data.consumer);
        this.wallets = data.wallets && data.wallets.map(wallet => new __1.Wallet(wallet));
        this.credentials = data.credentials && new __1.OAuthCredentials(data.credentials);
        if (data.virtual === undefined && data.credentials !== undefined && data.credentials.virtual !== undefined) {
            this.virtual = data.credentials.virtual;
        }
    }
    get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(UserStatus),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", __1.Domain)
], User.prototype, "domain", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBU1k7QUFDWixxREFBMEU7QUFFMUUsSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLCtCQUFpQixDQUFBO0lBQ2pCLG1DQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVELElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNsQiwyQkFBZSxDQUFBO0lBQ2YsMkJBQWUsQ0FBQTtJQUNmLGlDQUFxQixDQUFBO0lBQ3JCLGlDQUFxQixDQUFBO0lBQ3JCLDZCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQWdCRCxVQUFrQixTQUFRLGFBQVM7SUEwQmpDLFlBQVksT0FBNEIsRUFBRTtRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUExQkEsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBSTNDLFVBQUssR0FBVyxTQUFTLENBQUM7UUFJMUIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUk1QixXQUFNLEdBQWdCLFNBQVMsQ0FBQztRQUVsQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBRTVCLGFBQVEsR0FBWSxTQUFTLENBQUM7UUFFNUMsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUNoQyxZQUFPLEdBQWMsU0FBUyxDQUFDO1FBQy9CLGdCQUFXLEdBQXNCLFNBQVMsQ0FBQztRQUMzQyxZQUFPLEdBQVksU0FBUyxDQUFDO1FBSzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFlBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxvQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUUsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDMUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBMUNlO0lBQWIsNEJBQVUsRUFBRTs7dUNBQStCO0FBRTlCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQThCO0FBSTNDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHlCQUFPLEVBQUU7O21DQUNnQjtBQUkxQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFFBQVEsQ0FBQzs7a0NBQ1c7QUFJNUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNhO0FBRWxCO0lBQWIsNEJBQVUsRUFBRTs4QkFBVSxVQUFNO29DQUFhO0FBRTVCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQStCO0FBbkI5QyxvQkEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCYXNlTW9kZWwsXG4gIEJhc2VNb2RlbFNjaGVtYSxcbiAgT0F1dGhDcmVkZW50aWFscyxcbiAgRG9tYWluLFxuICBDb25zdW1lcixcbiAgV2FsbGV0LFxuICBDb25zdW1lclNjaGVtYSxcbiAgV2FsbGV0U2NoZW1hXG59IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNFbWFpbCwgSXNFbnVtLCBJc09wdGlvbmFsIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcbiAgQUNUSVZFID0gXCJhY3RpdmVcIixcbiAgSU5BQ1RJVkUgPSBcImluYWN0aXZlXCJcbn1cblxuZXhwb3J0IGVudW0gVXNlclJvbGUge1xuICBBRE1JTiA9IFwiYWRtaW5cIixcbiAgQVVESVQgPSBcImF1ZGl0XCIsXG4gIE1FRElBVE9SID0gXCJtZWRpYXRvclwiLFxuICBDT05TVU1FUiA9IFwiY29uc3VtZXJcIixcbiAgUFVCTElDID0gXCJwdWJsaWNcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBmaXJzdE5hbWU6IHN0cmluZztcbiAgbGFzdE5hbWU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgcm9sZT86IFVzZXJSb2xlO1xuICBzdGF0dXM/OiBVc2VyU3RhdHVzO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzO1xuICBkb21haW4/OiBEb21haW47XG4gIGNvbnN1bWVyPzogQ29uc3VtZXJTY2hlbWE7XG4gIHZpcnR1YWw/OiBib29sZWFuO1xuICB3YWxsZXRzPzogV2FsbGV0U2NoZW1hW107XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgVXNlclNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KCkgZmlyc3ROYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKSBsYXN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW1haWwoKVxuICBlbWFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRW51bShVc2VyUm9sZSlcbiAgcm9sZT86IFVzZXJSb2xlID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRW51bShVc2VyU3RhdHVzKVxuICBzdGF0dXM/OiBVc2VyU3RhdHVzID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKCkgZG9tYWluPzogRG9tYWluID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKCkgcGFzc3dvcmQ/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcbiAgd2FsbGV0cz86IFdhbGxldFtdID0gdW5kZWZpbmVkO1xuICBjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gIHZpcnR1YWw6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxVc2VyU2NoZW1hPiA9IHt9KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5jb25zdW1lciA9IGRhdGEuY29uc3VtZXIgJiYgbmV3IENvbnN1bWVyKGRhdGEuY29uc3VtZXIpO1xuICAgIHRoaXMud2FsbGV0cyA9IGRhdGEud2FsbGV0cyAmJiBkYXRhLndhbGxldHMubWFwKHdhbGxldCA9PiBuZXcgV2FsbGV0KHdhbGxldCkpO1xuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBkYXRhLmNyZWRlbnRpYWxzICYmIG5ldyBPQXV0aENyZWRlbnRpYWxzKGRhdGEuY3JlZGVudGlhbHMpO1xuXG4gICAgaWYgKGRhdGEudmlydHVhbCA9PT0gdW5kZWZpbmVkICYmIGRhdGEuY3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZCAmJiBkYXRhLmNyZWRlbnRpYWxzLnZpcnR1YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy52aXJ0dWFsID0gZGF0YS5jcmVkZW50aWFscy52aXJ0dWFsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWA7XG4gIH1cbn1cbiJdfQ==