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
class DomainSettings {
    constructor(data) {
        this.locks = undefined;
        Object.assign(data, this);
        this.locks = data.locks && new _1.DomainSettingsLocks(data.locks);
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    __metadata("design:type", _1.DomainSettingsLocks)
], DomainSettings.prototype, "locks", void 0);
exports.DomainSettings = DomainSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0RvbWFpbi9Eb21haW5TZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUFpRDtBQUNqRCx3QkFBd0M7QUFTeEM7SUFPRSxZQUFZLElBQThCO1FBRnhCLFVBQUssR0FBd0IsU0FBUyxDQUFDO1FBR3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLHNCQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0Y7QUFQbUI7SUFBakIsZ0NBQWMsRUFBRTs4QkFBUSxzQkFBbUI7NkNBQWE7QUFMM0Qsd0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0ZU5lc3RlZCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCB7IERvbWFpblNldHRpbmdzTG9ja3MgfSBmcm9tIFwiLlwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpblNldHRpbmdzU2NoZW1hIHtcbiAgbG9nbz86IHN0cmluZztcbiAgcHJpbWFyeUNvbG9yPzogc3RyaW5nO1xuICB0aW50Q29sb3I/OiBzdHJpbmc7XG4gIGxvY2tzOiBEb21haW5TZXR0aW5nc0xvY2tzO1xufVxuXG5leHBvcnQgY2xhc3MgRG9tYWluU2V0dGluZ3MgaW1wbGVtZW50cyBEb21haW5TZXR0aW5nc1NjaGVtYSB7XG4gIGxvZ28/OiBzdHJpbmc7XG4gIHByaW1hcnlDb2xvcj86IHN0cmluZztcbiAgdGludENvbG9yPzogc3RyaW5nO1xuXG4gIEBWYWxpZGF0ZU5lc3RlZCgpIGxvY2tzOiBEb21haW5TZXR0aW5nc0xvY2tzID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQYXJ0aWFsPERvbWFpblNldHRpbmdzPikge1xuICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvY2tzID0gZGF0YS5sb2NrcyAmJiBuZXcgRG9tYWluU2V0dGluZ3NMb2NrcyhkYXRhLmxvY2tzKTtcbiAgfVxufVxuIl19