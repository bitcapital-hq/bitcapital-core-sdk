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
    constructor(data = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBQTZEO0FBQzdELDBCQUFnSDtBQUNoSCxxREFBcUQ7QUFFckQsSUFBWSxlQUlYO0FBSkQsV0FBWSxlQUFlO0lBQ3pCLG9EQUFpQyxDQUFBO0lBQ2pDLGdEQUE2QixDQUFBO0lBQzdCLHNDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUkxQjtBQW1CRCxpQkFBeUIsU0FBUSxhQUFTO0lBV3hDLFlBQVksT0FBbUMsRUFBRTtRQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFUZCxTQUFJLEdBQW9CLFNBQVMsQ0FBQztRQUVsQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLGNBQVMsR0FBVSxTQUFTLENBQUM7UUFDN0IsYUFBUSxHQUFlLFNBQVMsQ0FBQztRQUNqQyxXQUFNLEdBQXdCLFNBQVMsQ0FBQztRQUN4QyxtQkFBYyxHQUErQixTQUFTLENBQUM7UUFLckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksVUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxRQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksV0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7Q0FDRjtBQWxCQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGVBQWUsQ0FBQzs7eUNBQ1U7QUFIcEMsa0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNhY3Rpb25TdGF0ZSwgVHJhbnNhY3Rpb25TdGF0ZVNjaGVtYSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgV2FsbGV0U2NoZW1hLCBQYXltZW50U2NoZW1hLCBVc2VyU2NoZW1hLCBXYWxsZXQsIFVzZXIsIFBheW1lbnQgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGVudW0gVHJhbnNhY3Rpb25UeXBlIHtcbiAgQ1JFQVRFX0FDQ09VTlQgPSBcImNyZWF0ZV9hY2NvdW50XCIsXG4gIENIQU5HRV9UUlVTVCA9IFwiY2hhbmdlX3RydXN0XCIsXG4gIFBBWU1FTlQgPSBcInBheW1lbnRcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uQWRkaXRpb25hbERhdGEge1xuICBoYXNoPzogc3RyaW5nO1xuICBhc3NldF9pZD86IHN0cmluZztcbiAgd2FsbGV0X2lkPzogc3RyaW5nO1xuICBhc3NldF9jb2RlPzogc3RyaW5nO1xuICBjb25kdWN0b3JUeXBlPzogXCJib2xldG9cIiB8IFwidGVkZG9jXCI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNhY3Rpb25TY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICB0eXBlOiBUcmFuc2FjdGlvblR5cGU7XG4gIHNvdXJjZTogV2FsbGV0U2NoZW1hO1xuICBwYXltZW50cz86IFBheW1lbnRTY2hlbWFbXTtcbiAgc3RhdGVzPzogVHJhbnNhY3Rpb25TdGF0ZVNjaGVtYVtdO1xuICBjcmVhdGVkQnk/OiBVc2VyU2NoZW1hO1xuICBhZGRpdGlvbmFsRGF0YT86IFRyYW5zYWN0aW9uQWRkaXRpb25hbERhdGE7XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbiBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFRyYW5zYWN0aW9uU2NoZW1hIHtcbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKFRyYW5zYWN0aW9uVHlwZSlcbiAgdHlwZTogVHJhbnNhY3Rpb25UeXBlID0gdW5kZWZpbmVkO1xuXG4gIHNvdXJjZTogV2FsbGV0ID0gdW5kZWZpbmVkO1xuICBjcmVhdGVkQnk/OiBVc2VyID0gdW5kZWZpbmVkO1xuICBwYXltZW50cz86IFBheW1lbnRbXSA9IHVuZGVmaW5lZDtcbiAgc3RhdGVzPzogVHJhbnNhY3Rpb25TdGF0ZVtdID0gdW5kZWZpbmVkO1xuICBhZGRpdGlvbmFsRGF0YT86IFRyYW5zYWN0aW9uQWRkaXRpb25hbERhdGEgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxUcmFuc2FjdGlvblNjaGVtYT4gPSB7fSkge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuc291cmNlID0gZGF0YS5zb3VyY2UgJiYgbmV3IFdhbGxldChkYXRhLnNvdXJjZSk7XG4gICAgdGhpcy5jcmVhdGVkQnkgPSBkYXRhLmNyZWF0ZWRCeSAmJiBuZXcgVXNlcihkYXRhLmNyZWF0ZWRCeSk7XG4gICAgdGhpcy5wYXltZW50cyA9IGRhdGEucGF5bWVudHMgJiYgZGF0YS5wYXltZW50cy5tYXAocGF5bWVudCA9PiBuZXcgUGF5bWVudChwYXltZW50KSk7XG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcyAmJiBkYXRhLnN0YXRlcy5tYXAoc3RhdGUgPT4gbmV3IFRyYW5zYWN0aW9uU3RhdGUoc3RhdGUpKTtcbiAgfVxufVxuIl19