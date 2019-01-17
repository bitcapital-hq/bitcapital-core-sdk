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
    constructor(data = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL1Bob25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQTBGO0FBQzFGLHdCQUE2QjtBQUM3QiwwQkFBZ0Q7QUFFaEQsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLDBCQUFhLENBQUE7SUFDYiwwQkFBYSxDQUFBO0lBQ2IsOEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBVUQsV0FBbUIsU0FBUSxhQUFTO0lBb0JsQyxZQUFZLE9BQTZCLEVBQUU7UUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBcEJkLGFBQVEsR0FBYyxTQUFTLENBQUM7UUFFbEIsU0FBSSxHQUFjLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFJakQsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl6QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBTzNCLGVBQVUsR0FBVSxTQUFTLENBQUM7UUFLNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxXQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjtBQXpCZTtJQUFiLDRCQUFVLEVBQUU7O21DQUFvQztBQUlqRDtJQUZDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFOzttQ0FDUTtBQUl6QjtJQUZDLDRCQUFVLEVBQUU7SUFDWixnQ0FBYyxFQUFFOztxQ0FDVTtBQUViO0lBQWIsNEJBQVUsRUFBRTs7d0NBQW9CO0FBS2pDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLEVBQUU7SUFDUix5QkFBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMseUNBQXlDOzs4QkFDakYsSUFBSTt5Q0FBYTtBQWxCaEMsc0JBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXNEYXRlLCBJc05vdEVtcHR5LCBJc051bWJlclN0cmluZywgSXNPcHRpb25hbCwgTWF4RGF0ZSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCB7IENvbnN1bWVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCBlbnVtIFBob25lVHlwZSB7XG4gIEhPTUUgPSBcImhvbWVcIixcbiAgV09SSyA9IFwid29ya1wiLFxuICBNT0JJTEUgPSBcIm1vYmlsZVwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGhvbmVTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICBjb2RlOiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBleHRlbnNpb24/OiBzdHJpbmc7XG4gIHZlcmlmaWVkQXQ/OiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgUGhvbmUgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBQaG9uZVNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKSB0eXBlOiBQaG9uZVR5cGUgPSBQaG9uZVR5cGUuTU9CSUxFO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyU3RyaW5nKClcbiAgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyU3RyaW5nKClcbiAgbnVtYmVyOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKSBleHRlbnNpb24/OiBzdHJpbmc7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEYXRlKClcbiAgQE1heERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyA1ICogNjAwMDApKSAvLyBOb3cgKyA1bWluIGZvciBzZXJ2ZXIgdGltZSBkaWZmZXJlbmNlc1xuICB2ZXJpZmllZEF0PzogRGF0ZSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBob25lU2NoZW1hPiA9IHt9KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy52ZXJpZmllZEF0ID0gZGF0YS52ZXJpZmllZEF0ICYmIG5ldyBEYXRlKGRhdGEudmVyaWZpZWRBdCk7XG4gICAgdGhpcy5jb25zdW1lciA9IGRhdGEuY29uc3VtZXIgJiYgbmV3IENvbnN1bWVyKGRhdGEuY29uc3VtZXIpO1xuICB9XG59XG4iXX0=