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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdURBQW9EO0FBTTNDLDBCQU5BLGlDQUFlLENBTUE7QUFMeEIsMEJBQWdEO0FBQ2hELDZDQUFzQztBQUV0QyxxREFBcUQ7QUFpQnJELGlCQUFpQyxTQUFRLGFBQVM7SUFhaEQsWUFBWSxJQUFnQztRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFaZCxTQUFJLEdBQThCLFNBQVMsQ0FBQztRQUk1QyxTQUFJLEdBQW9CLFNBQVMsQ0FBQztRQUdsQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRTNCLGFBQVEsR0FBZSxTQUFTLENBQUM7UUFLL0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWpCQztJQURDLDRCQUFVLEVBQUU7O3lDQUMrQjtBQUk1QztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGlDQUFlLENBQUM7O3lDQUNVO0FBR2xDO0lBREMsNEJBQVUsRUFBRTs4QkFDTCxnQkFBTTsyQ0FBYTtBQVQ3Qiw4QkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2FjdGlvblR5cGUgfSBmcm9tIFwiLi9UcmFuc2FjdGlvblR5cGVcIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuLi9XYWxsZXQvV2FsbGV0XCI7XG5pbXBvcnQgUGF5bWVudCBmcm9tIFwiLi4vUGF5bWVudC9QYXltZW50XCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0gfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCB7IFRyYW5zYWN0aW9uVHlwZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uQWRkaXRpb25hbERhdGEge1xuICBoYXNoPzogc3RyaW5nO1xuICBhc3NldElkPzogc3RyaW5nO1xuICBhc3NldENvZGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNhY3Rpb25TY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBkYXRhOiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhO1xuICB0eXBlOiBUcmFuc2FjdGlvblR5cGU7XG4gIHNvdXJjZTogV2FsbGV0O1xuICBwYXltZW50cz86IFBheW1lbnRbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNhY3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBUcmFuc2FjdGlvblNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgZGF0YTogVHJhbnNhY3Rpb25BZGRpdGlvbmFsRGF0YSA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oVHJhbnNhY3Rpb25UeXBlKVxuICB0eXBlOiBUcmFuc2FjdGlvblR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBzb3VyY2U6IFdhbGxldCA9IHVuZGVmaW5lZDtcbiAgXG4gIHBheW1lbnRzPzogUGF5bWVudFtdID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VHJhbnNhY3Rpb25TY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gIH1cbn1cbiJdfQ==