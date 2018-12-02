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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL1Bob25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQWtHO0FBQ2xHLHdCQUE2QjtBQUM3QiwwQkFBZ0Q7QUFFaEQsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLDBCQUFhLENBQUE7SUFDYiwwQkFBYSxDQUFBO0lBQ2IsOEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBWUQsV0FBMkIsU0FBUSxhQUFTO0lBc0IxQyxZQUFZLElBQTBCO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXRCQSxTQUFJLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUVuQyxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBRXBDLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFJekMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl6QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBTzNCLGVBQVUsR0FBVSxTQUFTLENBQUM7UUFLNUIsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRyxDQUFDO0NBQ0Y7QUE1QmU7SUFBYiw0QkFBVSxFQUFFOzttQ0FBb0M7QUFFbkM7SUFBYiw0QkFBVSxFQUFFOzhCQUFZLFdBQVE7dUNBQWE7QUFFcEM7SUFBVCx3QkFBTSxFQUFFOzt5Q0FBZ0M7QUFJekM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7bUNBQ1E7QUFJekI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7cUNBQ1U7QUFFYjtJQUFiLDRCQUFVLEVBQUU7O3dDQUFvQjtBQUtqQztJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFO0lBQ1IseUJBQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlDQUF5Qzs7OEJBQ2pGLElBQUk7eUNBQWE7QUFwQmhDLHdCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzRGF0ZSwgSXNOb3RFbXB0eSwgSXNOdW1iZXJTdHJpbmcsIElzT3B0aW9uYWwsIElzVVVJRCwgTWF4RGF0ZSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCB7IENvbnN1bWVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCBlbnVtIFBob25lVHlwZSB7XG4gIEhPTUUgPSBcImhvbWVcIixcbiAgV09SSyA9IFwid29ya1wiLFxuICBNT0JJTEUgPSBcIm1vYmlsZVwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGhvbmVTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICB0eXBlPzogUGhvbmVUeXBlO1xuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICBjb25zdW1lcklkOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG4gIGV4dGVuc2lvbj86IHN0cmluZztcbiAgdmVyaWZpZWRBdD86IERhdGUgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob25lIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgUGhvbmVTY2hlbWEge1xuICBASXNPcHRpb25hbCgpIHR5cGU6IFBob25lVHlwZSA9IFBob25lVHlwZS5NT0JJTEU7XG5cbiAgQElzT3B0aW9uYWwoKSBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuXG4gIEBJc1VVSUQoKSBjb25zdW1lcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXJTdHJpbmcoKVxuICBjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXJTdHJpbmcoKVxuICBudW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpIGV4dGVuc2lvbj86IHN0cmluZztcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RhdGUoKVxuICBATWF4RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDUgKiA2MDAwMCkpIC8vIE5vdyArIDVtaW4gZm9yIHNlcnZlciB0aW1lIGRpZmZlcmVuY2VzXG4gIHZlcmlmaWVkQXQ/OiBEYXRlID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGhvbmVTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gICAgdGhpcy52ZXJpZmllZEF0ID0gZGF0YS52ZXJpZmllZEF0IGluc3RhbmNlb2YgRGF0ZSA/IGRhdGEudmVyaWZpZWRBdCA6IG5ldyBEYXRlKGRhdGEudmVyaWZpZWRBdCk7XG4gIH1cbn1cbiJdfQ==