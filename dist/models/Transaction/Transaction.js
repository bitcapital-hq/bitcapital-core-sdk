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
const _1 = require(".");
const __1 = require("..");
const class_validator_1 = require("class-validator");
var TransactionType;
(function (TransactionType) {
    TransactionType["CREATE_ACCOUNT"] = "create_account";
    TransactionType["CHANGE_TRUST"] = "change_trust";
    TransactionType["PAYMENT"] = "payment";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
class Transaction extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.type = undefined;
        this.source = undefined;
        this.createdBy = undefined;
        this.payments = undefined;
        this.states = undefined;
        this.additionalData = undefined;
        Object.assign(this, data);
        this.source = data.source && new __1.Wallet(data.source);
        this.createdBy = data.createdBy && new __1.User(data.createdBy);
        this.payments = data.payments && data.payments.map(payment => new __1.Payment(payment));
        this.states = data.states && data.states.map(state => new _1.TransactionState(state));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(TransactionType),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
exports.Transaction = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBQTZEO0FBQzdELDBCQUFnSDtBQUNoSCxxREFBcUQ7QUFFckQsSUFBWSxlQUlYO0FBSkQsV0FBWSxlQUFlO0lBQ3pCLG9EQUFpQyxDQUFBO0lBQ2pDLGdEQUE2QixDQUFBO0lBQzdCLHNDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUkxQjtBQW1CRCxpQkFBeUIsU0FBUSxhQUFTO0lBV3hDLFlBQVksSUFBZ0M7UUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVGQsU0FBSSxHQUFvQixTQUFTLENBQUM7UUFFbEMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixjQUFTLEdBQVUsU0FBUyxDQUFDO1FBQzdCLGFBQVEsR0FBZSxTQUFTLENBQUM7UUFDakMsV0FBTSxHQUF3QixTQUFTLENBQUM7UUFDeEMsbUJBQWMsR0FBK0IsU0FBUyxDQUFDO1FBS3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLFVBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksUUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksbUJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0Y7QUFsQkM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxlQUFlLENBQUM7O3lDQUNVO0FBSHBDLGtDQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zYWN0aW9uU3RhdGUsIFRyYW5zYWN0aW9uU3RhdGVTY2hlbWEgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFdhbGxldFNjaGVtYSwgUGF5bWVudFNjaGVtYSwgVXNlclNjaGVtYSwgV2FsbGV0LCBVc2VyLCBQYXltZW50IH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0gfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIFRyYW5zYWN0aW9uVHlwZSB7XG4gIENSRUFURV9BQ0NPVU5UID0gXCJjcmVhdGVfYWNjb3VudFwiLFxuICBDSEFOR0VfVFJVU1QgPSBcImNoYW5nZV90cnVzdFwiLFxuICBQQVlNRU5UID0gXCJwYXltZW50XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhIHtcbiAgaGFzaD86IHN0cmluZztcbiAgYXNzZXRfaWQ/OiBzdHJpbmc7XG4gIHdhbGxldF9pZD86IHN0cmluZztcbiAgYXNzZXRfY29kZT86IHN0cmluZztcbiAgY29uZHVjdG9yVHlwZT86IFwiYm9sZXRvXCIgfCBcInRlZGRvY1wiO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgdHlwZTogVHJhbnNhY3Rpb25UeXBlO1xuICBzb3VyY2U6IFdhbGxldFNjaGVtYTtcbiAgcGF5bWVudHM/OiBQYXltZW50U2NoZW1hW107XG4gIHN0YXRlcz86IFRyYW5zYWN0aW9uU3RhdGVTY2hlbWFbXTtcbiAgY3JlYXRlZEJ5PzogVXNlclNjaGVtYTtcbiAgYWRkaXRpb25hbERhdGE/OiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhO1xufVxuXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBUcmFuc2FjdGlvblNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShUcmFuc2FjdGlvblR5cGUpXG4gIHR5cGU6IFRyYW5zYWN0aW9uVHlwZSA9IHVuZGVmaW5lZDtcblxuICBzb3VyY2U6IFdhbGxldCA9IHVuZGVmaW5lZDtcbiAgY3JlYXRlZEJ5PzogVXNlciA9IHVuZGVmaW5lZDtcbiAgcGF5bWVudHM/OiBQYXltZW50W10gPSB1bmRlZmluZWQ7XG4gIHN0YXRlcz86IFRyYW5zYWN0aW9uU3RhdGVbXSA9IHVuZGVmaW5lZDtcbiAgYWRkaXRpb25hbERhdGE/OiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VHJhbnNhY3Rpb25TY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5zb3VyY2UgPSBkYXRhLnNvdXJjZSAmJiBuZXcgV2FsbGV0KGRhdGEuc291cmNlKTtcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRhdGEuY3JlYXRlZEJ5ICYmIG5ldyBVc2VyKGRhdGEuY3JlYXRlZEJ5KTtcbiAgICB0aGlzLnBheW1lbnRzID0gZGF0YS5wYXltZW50cyAmJiBkYXRhLnBheW1lbnRzLm1hcChwYXltZW50ID0+IG5ldyBQYXltZW50KHBheW1lbnQpKTtcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzICYmIGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgVHJhbnNhY3Rpb25TdGF0ZShzdGF0ZSkpO1xuICB9XG59XG4iXX0=