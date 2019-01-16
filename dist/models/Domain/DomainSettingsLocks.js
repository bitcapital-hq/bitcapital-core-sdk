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
    constructor(data) {
        this.total_single_transaction_value = undefined;
        this.total_recent_transactions_value_monthly = undefined;
        this.total_recent_transactions_value_weekly = undefined;
        this.total_recent_transactions_value_daily = undefined;
        this.total_sent_transactions_value_monthly = undefined;
        this.total_sent_transactions_value_weekly = undefined;
        this.total_sent_transactions_value_daily = undefined;
        this.total_received_transactions_value_monthly = undefined;
        this.total_received_transactions_value_weekly = undefined;
        this.total_received_transactions_value_daily = undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluU2V0dGluZ3NMb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvRG9tYWluL0RvbWFpblNldHRpbmdzTG9ja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBNEQ7QUFlNUQ7SUFtREUsWUFBWSxJQUFtQztRQS9DL0MsbUNBQThCLEdBQUcsU0FBUyxDQUFDO1FBSzNDLDRDQUF1QyxHQUFHLFNBQVMsQ0FBQztRQUtwRCwyQ0FBc0MsR0FBRyxTQUFTLENBQUM7UUFLbkQsMENBQXFDLEdBQUcsU0FBUyxDQUFDO1FBS2xELDBDQUFxQyxHQUFHLFNBQVMsQ0FBQztRQUtsRCx5Q0FBb0MsR0FBRyxTQUFTLENBQUM7UUFLakQsd0NBQW1DLEdBQUcsU0FBUyxDQUFDO1FBS2hELDhDQUF5QyxHQUFHLFNBQVMsQ0FBQztRQUt0RCw2Q0FBd0MsR0FBRyxTQUFTLENBQUM7UUFLckQsNENBQXVDLEdBQUcsU0FBUyxDQUFDO1FBR2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQWxEQztJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7OzJFQUNvQztBQUszQztJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O29GQUM2QztBQUtwRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O21GQUM0QztBQUtuRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O2tGQUMyQztBQUtsRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O2tGQUMyQztBQUtsRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O2lGQUMwQztBQUtqRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O2dGQUN5QztBQUtoRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O3NGQUMrQztBQUt0RDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O3FGQUM4QztBQUtyRDtJQUhDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBQ1YscUJBQUcsQ0FBQyxDQUFDLENBQUM7O29GQUM2QztBQWpEdEQsa0RBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWluLCBJc051bWJlciwgSXNOb3RFbXB0eSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5TZXR0aW5nc0xvY2tzU2NoZW1hIHtcbiAgdG90YWxfc2luZ2xlX3RyYW5zYWN0aW9uX3ZhbHVlOiBudW1iZXI7XG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfbW9udGhseTogbnVtYmVyO1xuICB0b3RhbF9yZWNlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX3dlZWtseTogbnVtYmVyO1xuICB0b3RhbF9yZWNlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX2RhaWx5OiBudW1iZXI7XG4gIHRvdGFsX3NlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX21vbnRobHk6IG51bWJlcjtcbiAgdG90YWxfc2VudF90cmFuc2FjdGlvbnNfdmFsdWVfd2Vla2x5OiBudW1iZXI7XG4gIHRvdGFsX3NlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX2RhaWx5OiBudW1iZXI7XG4gIHRvdGFsX3JlY2VpdmVkX3RyYW5zYWN0aW9uc192YWx1ZV9tb250aGx5OiBudW1iZXI7XG4gIHRvdGFsX3JlY2VpdmVkX3RyYW5zYWN0aW9uc192YWx1ZV93ZWVrbHk6IG51bWJlcjtcbiAgdG90YWxfcmVjZWl2ZWRfdHJhbnNhY3Rpb25zX3ZhbHVlX2RhaWx5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5TZXR0aW5nc0xvY2tzIGltcGxlbWVudHMgRG9tYWluU2V0dGluZ3NMb2Nrc1NjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyKClcbiAgQE1pbigwKVxuICB0b3RhbF9zaW5nbGVfdHJhbnNhY3Rpb25fdmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfbW9udGhseSA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc051bWJlcigpXG4gIEBNaW4oMClcbiAgdG90YWxfcmVjZW50X3RyYW5zYWN0aW9uc192YWx1ZV93ZWVrbHkgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VudF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHkgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3NlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX21vbnRobHkgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3NlbnRfdHJhbnNhY3Rpb25zX3ZhbHVlX3dlZWtseSA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc051bWJlcigpXG4gIEBNaW4oMClcbiAgdG90YWxfc2VudF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHkgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNOdW1iZXIoKVxuICBATWluKDApXG4gIHRvdGFsX3JlY2VpdmVkX3RyYW5zYWN0aW9uc192YWx1ZV9tb250aGx5ID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyKClcbiAgQE1pbigwKVxuICB0b3RhbF9yZWNlaXZlZF90cmFuc2FjdGlvbnNfdmFsdWVfd2Vla2x5ID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyKClcbiAgQE1pbigwKVxuICB0b3RhbF9yZWNlaXZlZF90cmFuc2FjdGlvbnNfdmFsdWVfZGFpbHkgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YT86IFBhcnRpYWw8RG9tYWluU2V0dGluZ3NMb2Nrcz4pIHtcbiAgICBPYmplY3QuYXNzaWduKGRhdGEsIHRoaXMpO1xuICB9XG59XG4iXX0=