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
const class_validator_1 = require("class-validator");
const _1 = require(".");
const __1 = require("..");
var PhoneType;
(function (PhoneType) {
    PhoneType["HOME"] = "home";
    PhoneType["WORK"] = "work";
    PhoneType["MOBILE"] = "mobile";
})(PhoneType = exports.PhoneType || (exports.PhoneType = {}));
class Phone extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.type = PhoneType.MOBILE;
        this.consumer = undefined;
        this.consumerId = undefined;
        this.code = undefined;
        this.number = undefined;
        this.verifiedAt = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
        this.verifiedAt = data.verifiedAt instanceof Date ? data.verifiedAt : new Date(data.verifiedAt);
    }
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Phone.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", _1.Consumer)
], Phone.prototype, "consumer", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], Phone.prototype, "consumerId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Phone.prototype, "code", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Phone.prototype, "number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Phone.prototype, "extension", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    class_validator_1.MaxDate(new Date(new Date().getTime() + 5 * 60000)) // Now + 5min for server time differences
    ,
    __metadata("design:type", Date)
], Phone.prototype, "verifiedAt", void 0);
exports.default = Phone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL1Bob25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQWtHO0FBQ2xHLHdCQUE2QjtBQUM3QiwwQkFBZ0Q7QUFFaEQsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLDBCQUFhLENBQUE7SUFDYiwwQkFBYSxDQUFBO0lBQ2IsOEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBWUQsV0FBMkIsU0FBUSxhQUFTO0lBc0IxQyxZQUFZLElBQTBCO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXRCQSxTQUFJLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUVuQyxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBRXBDLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFJekMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl6QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBTzNCLGVBQVUsR0FBVSxTQUFTLENBQUM7UUFLNUIsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRyxDQUFDO0NBQ0Y7QUE1QmU7SUFBYiw0QkFBVSxFQUFFOzttQ0FBb0M7QUFFbkM7SUFBYiw0QkFBVSxFQUFFOzhCQUFZLFdBQVE7dUNBQWE7QUFFcEM7SUFBVCx3QkFBTSxFQUFFOzt5Q0FBZ0M7QUFJekM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7bUNBQ1E7QUFJekI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7cUNBQ1U7QUFFYjtJQUFiLDRCQUFVLEVBQUU7O3dDQUFvQjtBQUtqQztJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFO0lBQ1IseUJBQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlDQUF5Qzs7OEJBQ2pGLElBQUk7eUNBQWE7QUFwQmhDLHdCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzRGF0ZSwgSXNOb3RFbXB0eSwgSXNOdW1iZXJTdHJpbmcsIElzT3B0aW9uYWwsIElzVVVJRCwgTWF4RGF0ZSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5cclxuZXhwb3J0IGVudW0gUGhvbmVUeXBlIHtcclxuICBIT01FID0gXCJob21lXCIsXHJcbiAgV09SSyA9IFwid29ya1wiLFxyXG4gIE1PQklMRSA9IFwibW9iaWxlXCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQaG9uZVNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgdHlwZT86IFBob25lVHlwZTtcclxuICBjb25zdW1lcj86IENvbnN1bWVyO1xyXG4gIGNvbnN1bWVySWQ6IHN0cmluZztcclxuICBjb2RlOiBzdHJpbmc7XHJcbiAgbnVtYmVyOiBzdHJpbmc7XHJcbiAgZXh0ZW5zaW9uPzogc3RyaW5nO1xyXG4gIHZlcmlmaWVkQXQ/OiBEYXRlIHwgc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG9uZSBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFBob25lU2NoZW1hIHtcclxuICBASXNPcHRpb25hbCgpIHR5cGU6IFBob25lVHlwZSA9IFBob25lVHlwZS5NT0JJTEU7XHJcblxyXG4gIEBJc09wdGlvbmFsKCkgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzVVVJRCgpIGNvbnN1bWVySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc051bWJlclN0cmluZygpXHJcbiAgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzTnVtYmVyU3RyaW5nKClcclxuICBudW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzT3B0aW9uYWwoKSBleHRlbnNpb24/OiBzdHJpbmc7XHJcblxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNEYXRlKClcclxuICBATWF4RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDUgKiA2MDAwMCkpIC8vIE5vdyArIDVtaW4gZm9yIHNlcnZlciB0aW1lIGRpZmZlcmVuY2VzXHJcbiAgdmVyaWZpZWRBdD86IERhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGhvbmVTY2hlbWE+KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuXHJcbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXHJcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcclxuICAgIHRoaXMudmVyaWZpZWRBdCA9IGRhdGEudmVyaWZpZWRBdCBpbnN0YW5jZW9mIERhdGUgPyBkYXRhLnZlcmlmaWVkQXQgOiBuZXcgRGF0ZShkYXRhLnZlcmlmaWVkQXQpO1xyXG4gIH1cclxufVxyXG4iXX0=