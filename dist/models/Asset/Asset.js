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
class Asset extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.code = undefined;
        this.name = undefined;
        this.wallet = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Asset.prototype, "code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", __1.Wallet)
], Asset.prototype, "wallet", void 0);
exports.default = Asset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0Fzc2V0L0Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXdEO0FBQ3hELHFEQUF5RDtBQVF6RCxXQUEyQixTQUFRLGFBQVM7SUFVMUMsWUFBWSxJQUEwQjtRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFUZCxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFHMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUsxQixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUNGO0FBZEM7SUFEQyw0QkFBVSxFQUFFOzttQ0FDWTtBQUd6QjtJQURDLDRCQUFVLEVBQUU7O21DQUNhO0FBRzFCO0lBREMsNEJBQVUsRUFBRTs4QkFDSixVQUFNO3FDQUFhO0FBUjlCLHdCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBXYWxsZXQgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzT3B0aW9uYWwsIElzTm90RW1wdHkgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBuYW1lPzogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIHdhbGxldD86IFdhbGxldDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZXQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBBc3NldFNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgbmFtZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgXG4gIEBJc09wdGlvbmFsKClcbiAgd2FsbGV0PzogV2FsbGV0ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QXNzZXRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gIH1cbn1cbiJdfQ==