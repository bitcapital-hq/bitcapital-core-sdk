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
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(UserStatus),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", __1.Domain)
], User.prototype, "domain", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRGO0FBQzVGLHFEQUEwRTtBQUUxRSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0FBRUQsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2xCLDJCQUFlLENBQUE7SUFDZiwyQkFBZSxDQUFBO0lBQ2YsaUNBQXFCLENBQUE7SUFDckIsaUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBZ0JELFVBQTBCLFNBQVEsYUFBUztJQThCekMsWUFBWSxJQUF5QjtRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUE3QmQsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUc5QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBSTdCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFJMUIsU0FBSSxHQUFhLFNBQVMsQ0FBQztRQUkzQixXQUFNLEdBQWUsU0FBUyxDQUFDO1FBRy9CLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFHM0IsYUFBUSxHQUFZLFNBQVMsQ0FBQztRQUU5QixhQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ2hDLFlBQU8sR0FBYyxTQUFTLENBQUM7UUFDL0IsZ0JBQVcsR0FBc0IsU0FBUyxDQUFDO1FBQzNDLFlBQU8sR0FBWSxTQUFTLENBQUM7UUFLM0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxPQUFPO1lBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV6RyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxvQkFBZ0I7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDbEIsQ0FBQyxDQUFDLElBQUksb0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBaERDO0lBREMsNEJBQVUsRUFBRTs7dUNBQ2lCO0FBRzlCO0lBREMsNEJBQVUsRUFBRTs7c0NBQ2dCO0FBSTdCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHlCQUFPLEVBQUU7O21DQUNnQjtBQUkxQjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFFBQVEsQ0FBQzs7a0NBQ1U7QUFJM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNZO0FBRy9CO0lBREMsNEJBQVUsRUFBRTs4QkFDTCxVQUFNO29DQUFhO0FBRzNCO0lBREMsNEJBQVUsRUFBRTs7c0NBQ2lCO0FBdkJoQyx1QkFrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgT0F1dGhDcmVkZW50aWFscywgRG9tYWluLCBDb25zdW1lciwgV2FsbGV0IH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VtYWlsLCBJc0VudW0sIElzT3B0aW9uYWwgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIFVzZXJTdGF0dXMge1xuICBBQ1RJVkUgPSBcImFjdGl2ZVwiLFxuICBJTkFDVElWRSA9IFwiaW5hY3RpdmVcIlxufVxuXG5leHBvcnQgZW51bSBVc2VyUm9sZSB7XG4gIEFETUlOID0gXCJhZG1pblwiLFxuICBBVURJVCA9IFwiYXVkaXRcIixcbiAgTUVESUFUT1IgPSBcIm1lZGlhdG9yXCIsXG4gIENPTlNVTUVSID0gXCJjb25zdW1lclwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuICBsYXN0TmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgc3RhdHVzOiBVc2VyU3RhdHVzO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzO1xuICBkb21haW46IERvbWFpbjtcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcbiAgdmlydHVhbD86IGJvb2xlYW47XG4gIHdhbGxldHM/OiBXYWxsZXRbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFVzZXJTY2hlbWEge1xuICBASXNOb3RFbXB0eSgpXG4gIGZpcnN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgbGFzdE5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VtYWlsKClcbiAgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oVXNlclJvbGUpXG4gIHJvbGU6IFVzZXJSb2xlID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShVc2VyU3RhdHVzKVxuICBzdGF0dXM6IFVzZXJTdGF0dXMgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBkb21haW46IERvbWFpbiA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIHBhc3N3b3JkPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG4gIHdhbGxldHM/OiBXYWxsZXRbXSA9IHVuZGVmaW5lZDtcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xuICB2aXJ0dWFsOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlclNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcblxuICAgIHRoaXMudmlydHVhbCA9XG4gICAgICBkYXRhLmNyZWRlbnRpYWxzICYmIGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA/IGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA6IGRhdGEudmlydHVhbCB8fCB0aGlzLnZpcnR1YWw7XG5cbiAgICAvLyBSZWxhdGlvbnNoaXAgYXR0cmlidXRlcyBlbmZvcmNpbmdcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gZGF0YS5jcmVkZW50aWFsc1xuICAgICAgPyBkYXRhLmNyZWRlbnRpYWxzIGluc3RhbmNlb2YgT0F1dGhDcmVkZW50aWFsc1xuICAgICAgICA/IGRhdGEuY3JlZGVudGlhbHNcbiAgICAgICAgOiBuZXcgT0F1dGhDcmVkZW50aWFscyhkYXRhLmNyZWRlbnRpYWxzKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICB9XG59XG4iXX0=