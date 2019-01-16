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
const TransactionType_1 = require("./TransactionType");
exports.TransactionType = TransactionType_1.TransactionType;
const __1 = require("..");
const Wallet_1 = require("../Wallet/Wallet");
const class_validator_1 = require("class-validator");
class Transaction extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.data = undefined;
        this.type = undefined;
        this.source = undefined;
        this.payments = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], Transaction.prototype, "data", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(TransactionType_1.TransactionType),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Wallet_1.default)
], Transaction.prototype, "source", void 0);
exports.default = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdURBQW9EO0FBTTNDLDBCQU5BLGlDQUFlLENBTUE7QUFMeEIsMEJBQWdEO0FBQ2hELDZDQUFzQztBQUV0QyxxREFBcUQ7QUFpQnJELGlCQUFpQyxTQUFRLGFBQVM7SUFXaEQsWUFBWSxJQUFnQztRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFYQSxTQUFJLEdBQThCLFNBQVMsQ0FBQztRQUkxRCxTQUFJLEdBQW9CLFNBQVMsQ0FBQztRQUVwQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRXpDLGFBQVEsR0FBZSxTQUFTLENBQUM7UUFLL0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWhCZTtJQUFiLDRCQUFVLEVBQUU7O3lDQUE2QztBQUkxRDtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGlDQUFlLENBQUM7O3lDQUNVO0FBRXBCO0lBQWIsNEJBQVUsRUFBRTs4QkFBUyxnQkFBTTsyQ0FBYTtBQVAzQyw4QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2FjdGlvblR5cGUgfSBmcm9tIFwiLi9UcmFuc2FjdGlvblR5cGVcIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi4vV2FsbGV0L1dhbGxldFwiO1xyXG5pbXBvcnQgUGF5bWVudCBmcm9tIFwiLi4vUGF5bWVudC9QYXltZW50XCI7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCB7IFRyYW5zYWN0aW9uVHlwZSB9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhIHtcclxuICBoYXNoPzogc3RyaW5nO1xyXG4gIGFzc2V0SWQ/OiBzdHJpbmc7XHJcbiAgYXNzZXRDb2RlPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcclxuICBkYXRhOiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhO1xyXG4gIHR5cGU6IFRyYW5zYWN0aW9uVHlwZTtcclxuICBzb3VyY2U6IFdhbGxldDtcclxuICBwYXltZW50cz86IFBheW1lbnRbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNhY3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBUcmFuc2FjdGlvblNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBkYXRhOiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzRW51bShUcmFuc2FjdGlvblR5cGUpXHJcbiAgdHlwZTogVHJhbnNhY3Rpb25UeXBlID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpIHNvdXJjZTogV2FsbGV0ID0gdW5kZWZpbmVkO1xyXG5cclxuICBwYXltZW50cz86IFBheW1lbnRbXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxUcmFuc2FjdGlvblNjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xyXG4gIH1cclxufVxyXG4iXX0=