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
const class_validator_1 = require("../../../node_modules/class-validator");
class BankTransferDestination {
    constructor(data) {
        this.account = undefined;
        this.accountDigit = undefined;
        this.agency = undefined;
        this.agencyDigit = undefined;
        this.bank = undefined;
        this.name = undefined;
        this.taxIdNumber = undefined;
        this.type = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BankTransferDestination.prototype, "account", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferDestination.prototype, "accountDigit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BankTransferDestination.prototype, "agency", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferDestination.prototype, "agencyDigit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BankTransferDestination.prototype, "bank", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferDestination.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferDestination.prototype, "taxIdNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferDestination.prototype, "type", void 0);
exports.BankTransferDestination = BankTransferDestination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua1RyYW5zZmVyRGVzdGluYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1BheW1lbnQvQmFua1RyYW5zZmVyRGVzdGluYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyRUFBbUU7QUFhbkU7SUFrQkksWUFBWSxJQUE0QztRQWhCeEQsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUVqQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRTNCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFekIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUVoQyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQW5CRztJQURDLDRCQUFVLEVBQUU7O3dEQUNlO0FBRTVCO0lBREMsNEJBQVUsRUFBRTs7NkRBQ29CO0FBRWpDO0lBREMsNEJBQVUsRUFBRTs7dURBQ2M7QUFFM0I7SUFEQyw0QkFBVSxFQUFFOzs0REFDbUI7QUFFaEM7SUFEQyw0QkFBVSxFQUFFOztxREFDWTtBQUV6QjtJQURDLDRCQUFVLEVBQUU7O3FEQUNZO0FBRXpCO0lBREMsNEJBQVUsRUFBRTs7NERBQ21CO0FBRWhDO0lBREMsNEJBQVUsRUFBRTs7cURBQ1k7QUFoQjdCLDBEQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYW5rVHJhbnNmZXJEZXN0aW5hdGlvblNjaGVtYSB7XHJcbiAgICBhY2NvdW50OiBudW1iZXI7XHJcbiAgICBhY2NvdW50RGlnaXQ6IHN0cmluZztcclxuICAgIGFnZW5jeTogbnVtYmVyO1xyXG4gICAgYWdlbmN5RGlnaXQ6IHN0cmluZztcclxuICAgIGJhbms6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHRheElkTnVtYmVyOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYW5rVHJhbnNmZXJEZXN0aW5hdGlvbiBpbXBsZW1lbnRzIEJhbmtUcmFuc2ZlckRlc3RpbmF0aW9uU2NoZW1hIHtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFjY291bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFjY291bnREaWdpdDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYWdlbmN5OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBhZ2VuY3lEaWdpdDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYmFuazogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgdGF4SWROdW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIHR5cGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJhbmtUcmFuc2ZlckRlc3RpbmF0aW9uU2NoZW1hPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19