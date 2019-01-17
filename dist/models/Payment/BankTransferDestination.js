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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua1RyYW5zZmVyRGVzdGluYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1BheW1lbnQvQmFua1RyYW5zZmVyRGVzdGluYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyRUFBbUU7QUFhbkU7SUFVRSxZQUFZLElBQTRDO1FBVDFDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFDaEMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUdyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFaZTtJQUFiLDRCQUFVLEVBQUU7O3dEQUE2QjtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7OzZEQUFrQztBQUNqQztJQUFiLDRCQUFVLEVBQUU7O3VEQUE0QjtBQUMzQjtJQUFiLDRCQUFVLEVBQUU7OzREQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7O3FEQUEwQjtBQUN6QjtJQUFiLDRCQUFVLEVBQUU7O3FEQUEwQjtBQUN6QjtJQUFiLDRCQUFVLEVBQUU7OzREQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7O3FEQUEwQjtBQVJ6QywwREFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYW5rVHJhbnNmZXJEZXN0aW5hdGlvblNjaGVtYSB7XHJcbiAgYWNjb3VudDogbnVtYmVyO1xyXG4gIGFjY291bnREaWdpdDogc3RyaW5nO1xyXG4gIGFnZW5jeTogbnVtYmVyO1xyXG4gIGFnZW5jeURpZ2l0OiBzdHJpbmc7XHJcbiAgYmFuazogbnVtYmVyO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICB0YXhJZE51bWJlcjogc3RyaW5nO1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtUcmFuc2ZlckRlc3RpbmF0aW9uIGltcGxlbWVudHMgQmFua1RyYW5zZmVyRGVzdGluYXRpb25TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjb3VudERpZ2l0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhZ2VuY3k6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFnZW5jeURpZ2l0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYW5rOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB0YXhJZE51bWJlcjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdHlwZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJhbmtUcmFuc2ZlckRlc3RpbmF0aW9uU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19