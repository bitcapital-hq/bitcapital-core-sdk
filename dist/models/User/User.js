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
        this.cards = undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRGO0FBQzVGLHFEQUEwRTtBQUcxRSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0FBRUQsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2xCLDJCQUFlLENBQUE7SUFDZiwyQkFBZSxDQUFBO0lBQ2YsaUNBQXFCLENBQUE7SUFDckIsaUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBaUJELFVBQTBCLFNBQVEsYUFBUztJQTJCekMsWUFBWSxJQUF5QjtRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUEzQkEsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBSTNDLFVBQUssR0FBVyxTQUFTLENBQUM7UUFJMUIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUk1QixXQUFNLEdBQWdCLFNBQVMsQ0FBQztRQUVsQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBRTVCLGFBQVEsR0FBWSxTQUFTLENBQUM7UUFFNUMsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUNoQyxZQUFPLEdBQWMsU0FBUyxDQUFDO1FBQy9CLFVBQUssR0FBWSxTQUFTLENBQUM7UUFDM0IsZ0JBQVcsR0FBc0IsU0FBUyxDQUFDO1FBQzNDLFlBQU8sR0FBWSxTQUFTLENBQUM7UUFLM0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxPQUFPO1lBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV6RyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxvQkFBZ0I7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDbEIsQ0FBQyxDQUFDLElBQUksb0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBOUNlO0lBQWIsNEJBQVUsRUFBRTs7dUNBQStCO0FBRTlCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQThCO0FBSTNDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHlCQUFPLEVBQUU7O21DQUNnQjtBQUkxQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFFBQVEsQ0FBQzs7a0NBQ1c7QUFJNUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNhO0FBRWxCO0lBQWIsNEJBQVUsRUFBRTs4QkFBVSxVQUFNO29DQUFhO0FBRTVCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQStCO0FBbkI5Qyx1QkErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgT0F1dGhDcmVkZW50aWFscywgRG9tYWluLCBDb25zdW1lciwgV2FsbGV0IH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW1haWwsIElzRW51bSwgSXNPcHRpb25hbCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9cIjtcclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJTdGF0dXMge1xyXG4gIEFDVElWRSA9IFwiYWN0aXZlXCIsXHJcbiAgSU5BQ1RJVkUgPSBcImluYWN0aXZlXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVXNlclJvbGUge1xyXG4gIEFETUlOID0gXCJhZG1pblwiLFxyXG4gIEFVRElUID0gXCJhdWRpdFwiLFxyXG4gIE1FRElBVE9SID0gXCJtZWRpYXRvclwiLFxyXG4gIENPTlNVTUVSID0gXCJjb25zdW1lclwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XHJcbiAgbGFzdE5hbWU6IHN0cmluZztcclxuICBlbWFpbDogc3RyaW5nO1xyXG4gIHJvbGU/OiBVc2VyUm9sZTtcclxuICBzdGF0dXM/OiBVc2VyU3RhdHVzO1xyXG4gIHBhc3N3b3JkPzogc3RyaW5nO1xyXG4gIGNyZWRlbnRpYWxzPzogT0F1dGhDcmVkZW50aWFscztcclxuICBkb21haW4/OiBEb21haW47XHJcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcclxuICB2aXJ0dWFsPzogYm9vbGVhbjtcclxuICB3YWxsZXRzPzogV2FsbGV0W107XHJcbiAgY2FyZHM/OiBDYXJkW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBVc2VyU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGZpcnN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpIGxhc3ROYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc05vdEVtcHR5KClcclxuICBASXNFbWFpbCgpXHJcbiAgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0VudW0oVXNlclJvbGUpXHJcbiAgcm9sZT86IFVzZXJSb2xlID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzRW51bShVc2VyU3RhdHVzKVxyXG4gIHN0YXR1cz86IFVzZXJTdGF0dXMgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc09wdGlvbmFsKCkgZG9tYWluPzogRG9tYWluID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNPcHRpb25hbCgpIHBhc3N3b3JkPzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xyXG4gIHdhbGxldHM/OiBXYWxsZXRbXSA9IHVuZGVmaW5lZDtcclxuICBjYXJkcz86IENhcmRbXSA9IHVuZGVmaW5lZDtcclxuICBjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XHJcbiAgdmlydHVhbDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxVc2VyU2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcblxyXG4gICAgdGhpcy52aXJ0dWFsID1cclxuICAgICAgZGF0YS5jcmVkZW50aWFscyAmJiBkYXRhLmNyZWRlbnRpYWxzLnZpcnR1YWwgPyBkYXRhLmNyZWRlbnRpYWxzLnZpcnR1YWwgOiBkYXRhLnZpcnR1YWwgfHwgdGhpcy52aXJ0dWFsO1xyXG5cclxuICAgIC8vIFJlbGF0aW9uc2hpcCBhdHRyaWJ1dGVzIGVuZm9yY2luZ1xyXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IGRhdGEuY3JlZGVudGlhbHNcclxuICAgICAgPyBkYXRhLmNyZWRlbnRpYWxzIGluc3RhbmNlb2YgT0F1dGhDcmVkZW50aWFsc1xyXG4gICAgICAgID8gZGF0YS5jcmVkZW50aWFsc1xyXG4gICAgICAgIDogbmV3IE9BdXRoQ3JlZGVudGlhbHMoZGF0YS5jcmVkZW50aWFscylcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpIHtcclxuICAgIHJldHVybiBgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWA7XHJcbiAgfVxyXG59XHJcbiJdfQ==