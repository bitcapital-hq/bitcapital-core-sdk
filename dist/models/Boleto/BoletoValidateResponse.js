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
class BoletoValidateResponse {
    constructor(data) {
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], BoletoValidateResponse.prototype, "paid", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], BoletoValidateResponse.prototype, "boletoInfo", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], BoletoValidateResponse.prototype, "paymentInfo", void 0);
exports.default = BoletoValidateResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvVmFsaWRhdGVSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQm9sZXRvL0JvbGV0b1ZhbGlkYXRlUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyRUFBbUU7QUErQ25FO0lBU0ksWUFBWSxJQUEyQztRQUNuRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0o7QUFURztJQURDLDRCQUFVLEVBQUU7O29EQUNDO0FBRWQ7SUFEQyw0QkFBVSxFQUFFOzswREFDVTtBQUV2QjtJQURDLDRCQUFVLEVBQUU7OzJEQUNZO0FBUDdCLHlDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXNOb3RFbXB0eSB9IGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWEge1xyXG4gICAgcGFpZDogYm9vbGVhbjtcclxuICAgIGJvbGV0b0luZm86IEJvbGV0b0luZm87XHJcbiAgICBwYXltZW50SW5mbzogUGF5bWVudEluZm87XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9JbmZvIHtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBhbW91bnQ6IG51bWJlcjtcclxuICAgIGV4cGlyZXNBdDogRGF0ZTtcclxuICAgIGhhc0V4cGlyYXRpb25EYXRlOiBib29sZWFuO1xyXG4gICAgYmFyY29kZU51bWJlcjogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudEluZm8ge1xyXG4gICAgY29udHJhY3RJZDogc3RyaW5nO1xyXG4gICAgaWROdW1iZXI6IHN0cmluZztcclxuICAgIHRyYWRlcnM6IFRyYWRlcnNJbmZvO1xyXG4gICAgZXhwaXJlc0F0OiBEYXRlO1xyXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcjtcclxuICAgIGFtb3VudERldGFpbHM6IFBheW1lbnRBbW91bnREZXRhaWxzO1xyXG4gICAgYWNjZXB0UGFydGlhbEFtb3VudDogUGFydGlhbEFtb3VudERldGFpbHM7XHJcbiAgICBiYXJjb2RlOiBzdHJpbmc7XHJcbiAgICBkaWdpdGFibGVMaW5lOiBzdHJpbmc7XHJcbiAgICBwYXltZW50RGVhZGxpbmU6IERhdGU7XHJcbiAgICB2YWxpZERhdGU6IGJvb2xlYW47XHJcbiAgICBuZXh0QnVzaW5lc3NEYXk6IHN0cmluZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWRlcnNJbmZvIHtcclxuICAgIHJlY2lwaWVudDogc3RyaW5nO1xyXG4gICAgcmVjaXBpZW50RG9jdW1lbnQ6IHN0cmluZztcclxuICAgIHBheWVyTmFtZTogc3RyaW5nO1xyXG4gICAgcGF5ZXJEb2N1bWVudDogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydGlhbEFtb3VudERldGFpbHMge1xyXG4gICAgY29kZTogbnVtYmVyO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRBbW91bnREZXRhaWxzIHtcclxuICAgIGludGVyZXN0QW1vdW50OiBudW1iZXI7XHJcbiAgICBkaXNjb3VudDogbnVtYmVyO1xyXG4gICAgZmluZUFtb3VudDogbnVtYmVyO1xyXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcjtcclxuICAgIHBheW1lbnRBbW91bnRVcGRhdGVkOiBudW1iZXI7XHJcbiAgICBjYWxjdWxhdGlvbkRhdGU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2UgaW1wbGVtZW50cyBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlU2NoZW1hIHtcclxuXHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBwYWlkOiBib29sZWFuO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYm9sZXRvSW5mbzogQm9sZXRvSW5mbztcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIHBheW1lbnRJbmZvOiBQYXltZW50SW5mbztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWE+KSB7XHJcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcbiAgICB9XHJcbn0iXX0=