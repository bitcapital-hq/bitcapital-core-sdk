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
const BankTransferDestination_1 = require("./BankTransferDestination");
const class_validator_1 = require("../../../node_modules/class-validator");
class BankTransfer {
    constructor(data) {
        this.destination = undefined;
        this.identificator = undefined;
        this.subIssuerCode = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", BankTransferDestination_1.BankTransferDestination)
], BankTransfer.prototype, "destination", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BankTransfer.prototype, "identificator", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BankTransfer.prototype, "subIssuerCode", void 0);
exports.BankTransfer = BankTransfer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua1RyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9QYXltZW50L0JhbmtUcmFuc2Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHVFQUFvRTtBQUNwRSwyRUFBbUU7QUFRbkU7SUFLRSxZQUFZLElBQWlDO1FBSi9CLGdCQUFXLEdBQTRCLFNBQVMsQ0FBQztRQUNqRCxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUNsQyxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFQZTtJQUFiLDRCQUFVLEVBQUU7OEJBQWMsaURBQXVCO2lEQUFhO0FBQ2pEO0lBQWIsNEJBQVUsRUFBRTs7bURBQW1DO0FBQ2xDO0lBQWIsNEJBQVUsRUFBRTs7bURBQW1DO0FBSGxELG9DQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFua1RyYW5zZmVyRGVzdGluYXRpb24gfSBmcm9tIFwiLi9CYW5rVHJhbnNmZXJEZXN0aW5hdGlvblwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFua1RyYW5zZmVyU2NoZW1hIHtcclxuICBkZXN0aW5hdGlvbjogQmFua1RyYW5zZmVyRGVzdGluYXRpb247XHJcbiAgaWRlbnRpZmljYXRvcjogbnVtYmVyO1xyXG4gIHN1Yklzc3VlckNvZGU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtUcmFuc2ZlciBpbXBsZW1lbnRzIEJhbmtUcmFuc2ZlclNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBkZXN0aW5hdGlvbjogQmFua1RyYW5zZmVyRGVzdGluYXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBpZGVudGlmaWNhdG9yOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBzdWJJc3N1ZXJDb2RlOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QmFua1RyYW5zZmVyU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19