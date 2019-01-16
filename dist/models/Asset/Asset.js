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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0Fzc2V0L0Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXdEO0FBQ3hELHFEQUF5RDtBQVF6RCxXQUEyQixTQUFRLGFBQVM7SUFPMUMsWUFBWSxJQUEwQjtRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFQQSxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFFMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUt4QyxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUNGO0FBWmU7SUFBYiw0QkFBVSxFQUFFOzttQ0FBMEI7QUFFekI7SUFBYiw0QkFBVSxFQUFFOzttQ0FBMkI7QUFFMUI7SUFBYiw0QkFBVSxFQUFFOzhCQUFVLFVBQU07cUNBQWE7QUFMNUMsd0JBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgV2FsbGV0IH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IElzT3B0aW9uYWwsIElzTm90RW1wdHkgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFzc2V0U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGNvZGU6IHN0cmluZztcclxuICB3YWxsZXQ/OiBXYWxsZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2V0IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQXNzZXRTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNPcHRpb25hbCgpIG5hbWU/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc09wdGlvbmFsKCkgd2FsbGV0PzogV2FsbGV0ID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEFzc2V0U2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==