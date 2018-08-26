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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Eb21haW4vRG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXNEO0FBQ3RELHFEQUE2RTtBQVE3RSxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsMkJBQWEsQ0FBQTtJQUNiLCtCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQVlELFlBQTRCLFNBQVEsYUFBUztJQWtCM0MsWUFBWSxJQUEyQjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFsQkEsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl2QyxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBSTdCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsU0FBSSxHQUFjLFNBQVMsQ0FBQztRQUU1QixVQUFLLEdBQWtCLFNBQVMsQ0FBQztRQUNqQyxhQUFRLEdBQW1CLFNBQVMsQ0FBQztRQUNyQyxTQUFJLEdBQWEsU0FBUyxDQUFDO1FBS3pCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUF2QmU7SUFBYiw0QkFBVSxFQUFFOztvQ0FBMEI7QUFJdkM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNVO0FBSTdCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7O29DQUNRO0FBR3pCO0lBREMsd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7O29DQUNDO0FBWjlCLHlCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBVc2VyIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0sIElzQWxwaGFudW1lcmljLCBJc0ZRRE4gfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluU2V0dGluZ3Mge1xuICBsb2dvPzogc3RyaW5nO1xuICBwcmltYXJ5Q29sb3I/OiBzdHJpbmc7XG4gIHRpbnRDb2xvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRG9tYWluUm9sZSB7XG4gIFJPT1QgPSBcInJvb3RcIixcbiAgQ09NTU9OID0gXCJjb21tb25cIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpblNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcm9sZTogRG9tYWluUm9sZTtcbiAgc2x1Zzogc3RyaW5nO1xuICB0ZXN0PzogYm9vbGVhbjtcbiAgdXJscz86IHN0cmluZ1tdO1xuICB1c2VyczogVXNlcltdIHwgbnVsbDtcbiAgc2V0dGluZ3M6IERvbWFpblNldHRpbmdzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW4gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBEb21haW5TY2hlbWEge1xuICBASXNOb3RFbXB0eSgpIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oRG9tYWluUm9sZSlcbiAgcm9sZTogRG9tYWluUm9sZSA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0FscGhhbnVtZXJpYygpXG4gIHNsdWc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNGUUROKHt9LCB7IGVhY2g6IHRydWUgfSlcbiAgdXJscz86IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gIHVzZXJzOiBVc2VyW10gfCBudWxsID0gdW5kZWZpbmVkO1xuICBzZXR0aW5nczogRG9tYWluU2V0dGluZ3MgPSB1bmRlZmluZWQ7XG4gIHRlc3Q/OiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8RG9tYWluU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xuICB9XG59XG4iXX0=