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
const class_validator_1 = require("class-validator");
class DomainSettingsLocks {
    constructor(data = {}) {
        this.total_single_transaction_value = 0;
        this.total_recent_transactions_value_monthly = 0;
        this.total_recent_transactions_value_weekly = 0;
        this.total_recent_transactions_value_daily = 0;
        this.total_sent_transactions_value_monthly = 0;
        this.total_sent_transactions_value_weekly = 0;
        this.total_sent_transactions_value_daily = 0;
        this.total_received_transactions_value_monthly = 0;
        this.total_received_transactions_value_weekly = 0;
        this.total_received_transactions_value_daily = 0;
        Object.assign(data, this);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_single_transaction_value", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_recent_transactions_value_monthly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_recent_transactions_value_weekly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_recent_transactions_value_daily", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_sent_transactions_value_monthly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_sent_transactions_value_weekly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_sent_transactions_value_daily", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_received_transactions_value_monthly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_received_transactions_value_weekly", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], DomainSettingsLocks.prototype, "total_received_transactions_value_daily", void 0);
exports.DomainSettingsLocks = DomainSettingsLocks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluU2V0dGluZ3NMb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvRG9tYWluL0RvbWFpblNldHRpbmdzTG9ja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBNEQ7QUFlNUQ7SUFtREUsWUFBWSxPQUFxQyxFQUFFO1FBL0NuRCxtQ0FBOEIsR0FBRyxDQUFDLENBQUM7UUFLbkMsNENBQXVDLEdBQUcsQ0FBQyxDQUFDO1FBSzVDLDJDQUFzQyxHQUFHLENBQUMsQ0FBQztRQUszQywwQ0FBcUMsR0FBRyxDQUFDLENBQUM7UUFLMUMsMENBQXFDLEdBQUcsQ0FBQyxDQUFDO1FBSzFDLHlDQUFvQyxHQUFHLENBQUMsQ0FBQztRQUt6Qyx3Q0FBbUMsR0FBRyxDQUFDLENBQUM7UUFLeEMsOENBQXlDLEdBQUcsQ0FBQyxDQUFDO1FBSzlDLDZDQUF3QyxHQUFHLENBQUMsQ0FBQztRQUs3Qyw0Q0FBdUMsR0FBRyxDQUFDLENBQUM7UUFHMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBbERDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7MkVBQzRCO0FBS25DO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7b0ZBQ3FDO0FBSzVDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7bUZBQ29DO0FBSzNDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7a0ZBQ21DO0FBSzFDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7a0ZBQ21DO0FBSzFDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7aUZBQ2tDO0FBS3pDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7Z0ZBQ2lDO0FBS3hDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7c0ZBQ3VDO0FBSzlDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7cUZBQ3NDO0FBSzdDO0lBSEMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7SUFDVixxQkFBRyxDQUFDLENBQUMsQ0FBQzs7b0ZBQ3FDO0FBakQ5QyxrREFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNaW4sIElzTnVtYmVyLCBJc05vdEVtcHR5IH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpblNldHRpbmdzTG9ja3NTY2hlbWEge1xuICB0b3RhbF9zaW5nbGVfdHJhbnNhY3Rpb25fdmFsdWU6IG51bWJlcjtcbiAgdG90YWxfcmVjZW50X3RyYW5zYWN0aW9uc192YWx1ZV9tb250aGx5OiBudW1iZXI7XG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfd2Vla2x5OiBudW1iZXI7XG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHk6IG51bWJlcjtcbiAgdG90YWxfc2VudF90cmFuc2FjdGlvbnNfdmFsdWVfbW9udGhseTogbnVtYmVyO1xuICB0b3RhbF9zZW50X3RyYW5zYWN0aW9uc192YWx1ZV93ZWVrbHk6IG51bWJlcjtcbiAgdG90YWxfc2VudF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHk6IG51bWJlcjtcbiAgdG90YWxfcmVjZWl2ZWRfdHJhbnNhY3Rpb25zX3ZhbHVlX21vbnRobHk6IG51bWJlcjtcbiAgdG90YWxfcmVjZWl2ZWRfdHJhbnNhY3Rpb25zX3ZhbHVlX3dlZWtseTogbnVtYmVyO1xuICB0b3RhbF9yZWNlaXZlZF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblNldHRpbmdzTG9ja3MgaW1wbGVtZW50cyBEb21haW5TZXR0aW5nc0xvY2tzU2NoZW1hIHtcbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3NpbmdsZV90cmFuc2FjdGlvbl92YWx1ZSA9IDA7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfbW9udGhseSA9IDA7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfd2Vla2x5ID0gMDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc051bWJlcigpXG4gIEBNaW4oMClcbiAgdG90YWxfcmVjZW50X3RyYW5zYWN0aW9uc192YWx1ZV9kYWlseSA9IDA7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3NlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX21vbnRobHkgPSAwO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyKClcbiAgQE1pbigwKVxuICB0b3RhbF9zZW50X3RyYW5zYWN0aW9uc192YWx1ZV93ZWVrbHkgPSAwO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyKClcbiAgQE1pbigwKVxuICB0b3RhbF9zZW50X3RyYW5zYWN0aW9uc192YWx1ZV9kYWlseSA9IDA7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VpdmVkX3RyYW5zYWN0aW9uc192YWx1ZV9tb250aGx5ID0gMDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc051bWJlcigpXG4gIEBNaW4oMClcbiAgdG90YWxfcmVjZWl2ZWRfdHJhbnNhY3Rpb25zX3ZhbHVlX3dlZWtseSA9IDA7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VpdmVkX3RyYW5zYWN0aW9uc192YWx1ZV9kYWlseSA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxEb21haW5TZXR0aW5nc0xvY2tzPiA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihkYXRhLCB0aGlzKTtcbiAgfVxufVxuIl19