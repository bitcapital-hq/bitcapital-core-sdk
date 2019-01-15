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
        this.consumer = undefined;
        this.type = PhoneType.MOBILE;
        this.code = undefined;
        this.number = undefined;
        this.verifiedAt = undefined;
        Object.assign(this, data);
        this.verifiedAt = data.verifiedAt && new Date(data.verifiedAt);
        this.consumer = data.consumer && new _1.Consumer(data.consumer);
    }
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Phone.prototype, "type", void 0);
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
exports.Phone = Phone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL1Bob25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQTBGO0FBQzFGLHdCQUE2QjtBQUM3QiwwQkFBZ0Q7QUFFaEQsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLDBCQUFhLENBQUE7SUFDYiwwQkFBYSxDQUFBO0lBQ2IsOEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBVUQsV0FBbUIsU0FBUSxhQUFTO0lBb0JsQyxZQUFZLElBQTBCO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXBCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBRWxCLFNBQUksR0FBYyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBSWpELFNBQUksR0FBVyxTQUFTLENBQUM7UUFJekIsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQU8zQixlQUFVLEdBQVUsU0FBUyxDQUFDO1FBSzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksV0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUF6QmU7SUFBYiw0QkFBVSxFQUFFOzttQ0FBb0M7QUFJakQ7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7bUNBQ1E7QUFJekI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7cUNBQ1U7QUFFYjtJQUFiLDRCQUFVLEVBQUU7O3dDQUFvQjtBQUtqQztJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFO0lBQ1IseUJBQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlDQUF5Qzs7OEJBQ2pGLElBQUk7eUNBQWE7QUFsQmhDLHNCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzRGF0ZSwgSXNOb3RFbXB0eSwgSXNOdW1iZXJTdHJpbmcsIElzT3B0aW9uYWwsIE1heERhdGUgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBDb25zdW1lciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xuXG5leHBvcnQgZW51bSBQaG9uZVR5cGUge1xuICBIT01FID0gXCJob21lXCIsXG4gIFdPUksgPSBcIndvcmtcIixcbiAgTU9CSUxFID0gXCJtb2JpbGVcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBob25lU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcbiAgY29kZTogc3RyaW5nO1xuICBudW1iZXI6IHN0cmluZztcbiAgZXh0ZW5zaW9uPzogc3RyaW5nO1xuICB2ZXJpZmllZEF0PzogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFBob25lIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgUGhvbmVTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuICBcbiAgQElzT3B0aW9uYWwoKSB0eXBlOiBQaG9uZVR5cGUgPSBQaG9uZVR5cGUuTU9CSUxFO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyU3RyaW5nKClcbiAgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyU3RyaW5nKClcbiAgbnVtYmVyOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKSBleHRlbnNpb24/OiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEYXRlKClcbiAgQE1heERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyA1ICogNjAwMDApKSAvLyBOb3cgKyA1bWluIGZvciBzZXJ2ZXIgdGltZSBkaWZmZXJlbmNlc1xuICB2ZXJpZmllZEF0PzogRGF0ZSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBob25lU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMudmVyaWZpZWRBdCA9IGRhdGEudmVyaWZpZWRBdCAmJiBuZXcgRGF0ZShkYXRhLnZlcmlmaWVkQXQpO1xuICAgIHRoaXMuY29uc3VtZXIgPSBkYXRhLmNvbnN1bWVyICYmIG5ldyBDb25zdW1lcihkYXRhLmNvbnN1bWVyKTtcbiAgfVxufVxuIl19