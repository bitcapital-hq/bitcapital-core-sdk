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
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends __1.BaseModel {
    constructor(data) {
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
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
        this.virtual =
            data.credentials && data.credentials.virtual ? data.credentials.virtual : data.virtual || this.virtual;
        // Relationship attributes enforcing
        this.credentials = data.credentials
            ? data.credentials instanceof __1.OAuthCredentials
                ? data.credentials
                : new __1.OAuthCredentials(data.credentials)
            : undefined;
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
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRGO0FBQzVGLHFEQUEwRTtBQUUxRSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0FBRUQsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2xCLDJCQUFlLENBQUE7SUFDZiwyQkFBZSxDQUFBO0lBQ2YsaUNBQXFCLENBQUE7SUFDckIsaUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBZ0JELFVBQTBCLFNBQVEsYUFBUztJQTBCekMsWUFBWSxJQUF5QjtRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUExQkEsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBSTNDLFVBQUssR0FBVyxTQUFTLENBQUM7UUFJMUIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUk1QixXQUFNLEdBQWdCLFNBQVMsQ0FBQztRQUVsQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBRTVCLGFBQVEsR0FBWSxTQUFTLENBQUM7UUFFNUMsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUNoQyxZQUFPLEdBQWMsU0FBUyxDQUFDO1FBQy9CLGdCQUFXLEdBQXNCLFNBQVMsQ0FBQztRQUMzQyxZQUFPLEdBQVksU0FBUyxDQUFDO1FBSzNCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsT0FBTztZQUNWLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFekcsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVc7WUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLFlBQVksb0JBQWdCO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ2xCLENBQUMsQ0FBQyxJQUFJLG9CQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDMUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQTdDZTtJQUFiLDRCQUFVLEVBQUU7O3VDQUErQjtBQUU5QjtJQUFiLDRCQUFVLEVBQUU7O3NDQUE4QjtBQUkzQztJQUZDLDRCQUFVLEVBQUU7SUFDWix5QkFBTyxFQUFFOzttQ0FDZ0I7QUFJMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxRQUFRLENBQUM7O2tDQUNXO0FBSTVCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsVUFBVSxDQUFDOztvQ0FDYTtBQUVsQjtJQUFiLDRCQUFVLEVBQUU7OEJBQVUsVUFBTTtvQ0FBYTtBQUU1QjtJQUFiLDRCQUFVLEVBQUU7O3NDQUErQjtBQW5COUMsdUJBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIE9BdXRoQ3JlZGVudGlhbHMsIERvbWFpbiwgQ29uc3VtZXIsIFdhbGxldCB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VtYWlsLCBJc0VudW0sIElzT3B0aW9uYWwgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICBBQ1RJVkUgPSBcImFjdGl2ZVwiLFxyXG4gIElOQUNUSVZFID0gXCJpbmFjdGl2ZVwiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJSb2xlIHtcclxuICBBRE1JTiA9IFwiYWRtaW5cIixcclxuICBBVURJVCA9IFwiYXVkaXRcIixcclxuICBNRURJQVRPUiA9IFwibWVkaWF0b3JcIixcclxuICBDT05TVU1FUiA9IFwiY29uc3VtZXJcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICByb2xlPzogVXNlclJvbGU7XHJcbiAgc3RhdHVzPzogVXNlclN0YXR1cztcclxuICBwYXNzd29yZD86IHN0cmluZztcclxuICBjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHM7XHJcbiAgZG9tYWluPzogRG9tYWluO1xyXG4gIGNvbnN1bWVyPzogQ29uc3VtZXI7XHJcbiAgdmlydHVhbD86IGJvb2xlYW47XHJcbiAgd2FsbGV0cz86IFdhbGxldFtdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgVXNlclNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBmaXJzdE5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzTm90RW1wdHkoKSBsYXN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzRW1haWwoKVxyXG4gIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNFbnVtKFVzZXJSb2xlKVxyXG4gIHJvbGU/OiBVc2VyUm9sZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0VudW0oVXNlclN0YXR1cylcclxuICBzdGF0dXM/OiBVc2VyU3RhdHVzID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNPcHRpb25hbCgpIGRvbWFpbj86IERvbWFpbiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzT3B0aW9uYWwoKSBwYXNzd29yZD86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcclxuICB3YWxsZXRzPzogV2FsbGV0W10gPSB1bmRlZmluZWQ7XHJcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xyXG4gIHZpcnR1YWw6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlclNjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xyXG5cclxuICAgIHRoaXMudmlydHVhbCA9XHJcbiAgICAgIGRhdGEuY3JlZGVudGlhbHMgJiYgZGF0YS5jcmVkZW50aWFscy52aXJ0dWFsID8gZGF0YS5jcmVkZW50aWFscy52aXJ0dWFsIDogZGF0YS52aXJ0dWFsIHx8IHRoaXMudmlydHVhbDtcclxuXHJcbiAgICAvLyBSZWxhdGlvbnNoaXAgYXR0cmlidXRlcyBlbmZvcmNpbmdcclxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBkYXRhLmNyZWRlbnRpYWxzXHJcbiAgICAgID8gZGF0YS5jcmVkZW50aWFscyBpbnN0YW5jZW9mIE9BdXRoQ3JlZGVudGlhbHNcclxuICAgICAgICA/IGRhdGEuY3JlZGVudGlhbHNcclxuICAgICAgICA6IG5ldyBPQXV0aENyZWRlbnRpYWxzKGRhdGEuY3JlZGVudGlhbHMpXHJcbiAgICAgIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKSB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xyXG4gIH1cclxufVxyXG4iXX0=