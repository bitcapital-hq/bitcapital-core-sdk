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
var DomainRole;
(function (DomainRole) {
    DomainRole["ROOT"] = "root";
    DomainRole["COMMON"] = "common";
})(DomainRole = exports.DomainRole || (exports.DomainRole = {}));
class Domain extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.name = undefined;
        this.role = undefined;
        this.slug = undefined;
        this.urls = undefined;
        this.users = undefined;
        this.settings = undefined;
        this.test = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Domain.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(DomainRole),
    __metadata("design:type", String)
], Domain.prototype, "role", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlphanumeric(),
    __metadata("design:type", String)
], Domain.prototype, "slug", void 0);
__decorate([
    class_validator_1.IsFQDN({}, { each: true }),
    __metadata("design:type", Array)
], Domain.prototype, "urls", void 0);
exports.default = Domain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Eb21haW4vRG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXNEO0FBQ3RELHFEQUE2RTtBQVE3RSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsMkJBQWEsQ0FBQTtJQUNiLCtCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQVlELFlBQTRCLFNBQVEsYUFBUztJQWtCM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFsQkEsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl2QyxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBSTdCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUU1QixVQUFLLEdBQWtCLFNBQVMsQ0FBQztRQUNqQyxhQUFRLEdBQW1CLFNBQVMsQ0FBQztRQUNyQyxTQUFJLEdBQWEsU0FBUyxDQUFDO1FBS3pCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUF2QmU7SUFBYiw0QkFBVSxFQUFFOztvQ0FBMEI7QUFJdkM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNVO0FBSTdCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7O29DQUNRO0FBR3pCO0lBREMsd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7O29DQUNDO0FBWjlCLHlCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBVc2VyIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSwgSXNBbHBoYW51bWVyaWMsIElzRlFETiB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluU2V0dGluZ3Mge1xyXG4gIGxvZ28/OiBzdHJpbmc7XHJcbiAgcHJpbWFyeUNvbG9yPzogc3RyaW5nO1xyXG4gIHRpbnRDb2xvcj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRG9tYWluUm9sZSB7XHJcbiAgUk9PVCA9IFwicm9vdFwiLFxyXG4gIENPTU1PTiA9IFwiY29tbW9uXCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEb21haW5TY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICByb2xlOiBEb21haW5Sb2xlO1xyXG4gIHNsdWc6IHN0cmluZztcclxuICB0ZXN0PzogYm9vbGVhbjtcclxuICB1cmxzPzogc3RyaW5nW107XHJcbiAgdXNlcnM6IFVzZXJbXSB8IG51bGw7XHJcbiAgc2V0dGluZ3M6IERvbWFpblNldHRpbmdzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW4gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBEb21haW5TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzRW51bShEb21haW5Sb2xlKVxyXG4gIHJvbGU6IERvbWFpblJvbGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc05vdEVtcHR5KClcclxuICBASXNBbHBoYW51bWVyaWMoKVxyXG4gIHNsdWc6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzRlFETih7fSwgeyBlYWNoOiB0cnVlIH0pXHJcbiAgdXJscz86IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xyXG5cclxuICB1c2VyczogVXNlcltdIHwgbnVsbCA9IHVuZGVmaW5lZDtcclxuICBzZXR0aW5nczogRG9tYWluU2V0dGluZ3MgPSB1bmRlZmluZWQ7XHJcbiAgdGVzdD86IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8RG9tYWluU2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==