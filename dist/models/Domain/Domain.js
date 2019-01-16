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
const _1 = require(".");
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
        this.urls = undefined;
        this.test = undefined;
        this.users = undefined;
        this.settings = undefined;
        Object.assign(this, data);
        this.users = data.users && data.users.map(user => new __1.User(user));
        this.settings = data.settings && new _1.DomainSettings(data.settings);
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
    class_validator_1.IsOptional(),
    class_validator_1.IsFQDN({}, { each: true }),
    __metadata("design:type", Array)
], Domain.prototype, "urls", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], Domain.prototype, "postbackUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], Domain.prototype, "test", void 0);
exports.Domain = Domain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Eb21haW4vRG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBQXlEO0FBQ3pELDBCQUFrRTtBQUNsRSxxREFBeUU7QUFFekUsSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFZRCxZQUFvQixTQUFRLGFBQVM7SUFvQm5DLFlBQVksSUFBMkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBcEJBLFNBQUksR0FBVyxTQUFTLENBQUM7UUFJdkMsU0FBSSxHQUFlLFNBQVMsQ0FBQztRQUk3QixTQUFJLEdBQWMsU0FBUyxDQUFDO1FBTWQsU0FBSSxHQUFZLFNBQVMsQ0FBQztRQUV4QyxVQUFLLEdBQVksU0FBUyxDQUFDO1FBQzNCLGFBQVEsR0FBbUIsU0FBUyxDQUFDO1FBS25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksUUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksaUJBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGO0FBM0JlO0lBQWIsNEJBQVUsRUFBRTs7b0NBQTBCO0FBSXZDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsVUFBVSxDQUFDOztvQ0FDVTtBQUk3QjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0NBQ0M7QUFJNUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sRUFBRTs7MkNBQ1k7QUFFUDtJQUFiLDRCQUFVLEVBQUU7O29DQUEyQjtBQWYxQyx3QkE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb21haW5TZXR0aW5ncywgRG9tYWluU2V0dGluZ3NTY2hlbWEgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSwgSXNGUUROLCBJc09wdGlvbmFsIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgZW51bSBEb21haW5Sb2xlIHtcbiAgUk9PVCA9IFwicm9vdFwiLFxuICBDT01NT04gPSBcImNvbW1vblwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgbmFtZTogc3RyaW5nO1xuICByb2xlOiBEb21haW5Sb2xlO1xuICB0ZXN0OiBib29sZWFuO1xuICB1cmxzPzogc3RyaW5nW107XG4gIHBvc3RiYWNrVXJsPzogc3RyaW5nO1xuICB1c2Vycz86IFVzZXJTY2hlbWFbXTtcbiAgc2V0dGluZ3M6IERvbWFpblNldHRpbmdzU2NoZW1hO1xufVxuXG5leHBvcnQgY2xhc3MgRG9tYWluIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgRG9tYWluU2NoZW1hIHtcbiAgQElzTm90RW1wdHkoKSBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKERvbWFpblJvbGUpXG4gIHJvbGU6IERvbWFpblJvbGUgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNGUUROKHt9LCB7IGVhY2g6IHRydWUgfSlcbiAgdXJscz86IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRlFETigpXG4gIHBvc3RiYWNrVXJsPzogc3RyaW5nO1xuXG4gIEBJc05vdEVtcHR5KCkgdGVzdDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICB1c2Vycz86IFVzZXJbXSA9IHVuZGVmaW5lZDtcbiAgc2V0dGluZ3M6IERvbWFpblNldHRpbmdzID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8RG9tYWluU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMudXNlcnMgPSBkYXRhLnVzZXJzICYmIGRhdGEudXNlcnMubWFwKHVzZXIgPT4gbmV3IFVzZXIodXNlcikpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBkYXRhLnNldHRpbmdzICYmIG5ldyBEb21haW5TZXR0aW5ncyhkYXRhLnNldHRpbmdzKTtcbiAgfVxufVxuIl19