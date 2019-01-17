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
    constructor(data = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0RvbWFpbi9Eb21haW5TZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUFpRDtBQUNqRCx3QkFBd0M7QUFTeEM7SUFPRSxZQUFZLE9BQWdDLEVBQUU7UUFGNUIsVUFBSyxHQUF3QixTQUFTLENBQUM7UUFHdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksc0JBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRjtBQVBtQjtJQUFqQixnQ0FBYyxFQUFFOzhCQUFRLHNCQUFtQjs2Q0FBYTtBQUwzRCx3Q0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRlTmVzdGVkIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuaW1wb3J0IHsgRG9tYWluU2V0dGluZ3NMb2NrcyB9IGZyb20gXCIuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluU2V0dGluZ3NTY2hlbWEge1xuICBsb2dvPzogc3RyaW5nO1xuICBwcmltYXJ5Q29sb3I/OiBzdHJpbmc7XG4gIHRpbnRDb2xvcj86IHN0cmluZztcbiAgbG9ja3M6IERvbWFpblNldHRpbmdzTG9ja3M7XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5TZXR0aW5ncyBpbXBsZW1lbnRzIERvbWFpblNldHRpbmdzU2NoZW1hIHtcbiAgbG9nbz86IHN0cmluZztcbiAgcHJpbWFyeUNvbG9yPzogc3RyaW5nO1xuICB0aW50Q29sb3I/OiBzdHJpbmc7XG5cbiAgQFZhbGlkYXRlTmVzdGVkKCkgbG9ja3M6IERvbWFpblNldHRpbmdzTG9ja3MgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxEb21haW5TZXR0aW5ncz4gPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgdGhpcyk7XG5cbiAgICB0aGlzLmxvY2tzID0gZGF0YS5sb2NrcyAmJiBuZXcgRG9tYWluU2V0dGluZ3NMb2NrcyhkYXRhLmxvY2tzKTtcbiAgfVxufVxuIl19