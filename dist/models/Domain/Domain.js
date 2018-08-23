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
    class_validator_1.IsFQDN(null, { each: true }),
    __metadata("design:type", Array)
], Domain.prototype, "urls", void 0);
exports.default = Domain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Eb21haW4vRG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXNEO0FBQ3RELHFEQUE2RTtBQVE3RSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsMkJBQWEsQ0FBQTtJQUNiLCtCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQVlELFlBQTRCLFNBQVEsYUFBUztJQW9CM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFuQmQsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl6QixTQUFJLEdBQWUsU0FBUyxDQUFDO1FBSTdCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUc1QixVQUFLLEdBQWtCLFNBQVMsQ0FBQztRQUNqQyxhQUFRLEdBQW1CLFNBQVMsQ0FBQztRQUNyQyxTQUFJLEdBQWEsU0FBUyxDQUFDO1FBS3pCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUF4QkM7SUFEQyw0QkFBVSxFQUFFOztvQ0FDWTtBQUl6QjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFVBQVUsQ0FBQzs7b0NBQ1U7QUFJN0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osZ0NBQWMsRUFBRTs7b0NBQ1E7QUFHekI7SUFEQyx3QkFBTSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQzs7b0NBQ0M7QUFiOUIseUJBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFVzZXIgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSwgSXNBbHBoYW51bWVyaWMsIElzRlFETiB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5TZXR0aW5ncyB7XG4gIGxvZ28/OiBzdHJpbmc7XG4gIHByaW1hcnlDb2xvcj86IHN0cmluZztcbiAgdGludENvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBEb21haW5Sb2xlIHtcbiAgUk9PVCA9IFwicm9vdFwiLFxuICBDT01NT04gPSBcImNvbW1vblwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgbmFtZTogc3RyaW5nO1xuICByb2xlOiBEb21haW5Sb2xlO1xuICBzbHVnOiBzdHJpbmc7XG4gIHRlc3Q/OiBib29sZWFuO1xuICB1cmxzPzogc3RyaW5nW107XG4gIHVzZXJzOiBVc2VyW10gfCBudWxsO1xuICBzZXR0aW5nczogRG9tYWluU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbiBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIERvbWFpblNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShEb21haW5Sb2xlKVxuICByb2xlOiBEb21haW5Sb2xlID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzQWxwaGFudW1lcmljKClcbiAgc2x1Zzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc0ZRRE4obnVsbCwge2VhY2g6IHRydWV9KVxuICB1cmxzPzogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cblxuICB1c2VyczogVXNlcltdIHwgbnVsbCA9IHVuZGVmaW5lZDtcbiAgc2V0dGluZ3M6IERvbWFpblNldHRpbmdzID0gdW5kZWZpbmVkO1xuICB0ZXN0PzogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPERvbWFpblNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19