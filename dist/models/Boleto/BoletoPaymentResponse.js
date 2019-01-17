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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class BoletoPaymentResponse {
    constructor(data) {
        this.paymentId = undefined;
        this.accountId = undefined;
        this.status = undefined;
        this.description = undefined;
        this.barcode = undefined;
        this.expiresAt = undefined;
        this.recipientName = undefined;
        this.discount = undefined;
        this.taxAmount = undefined;
        this.amount = undefined;
        Object.assign(this, data);
    }
    /**
     * Returns true if the model is valid or an array of validation errors if invalid
     *
     * @param {boolean} [toString] If toString is true, this will return a formatted error string
     */
    isValid(toString) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(this);
            if (errors.length === 0) {
                return true;
            }
            if (toString) {
                return errors.map(error => error.toString(true)).join("; ");
            }
            return errors;
        });
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "barcode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], BoletoPaymentResponse.prototype, "expiresAt", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "recipientName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "taxAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "amount", void 0);
exports.BoletoPaymentResponse = BoletoPaymentResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvUGF5bWVudFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Cb2xldG8vQm9sZXRvUGF5bWVudFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBd0U7QUFleEU7SUFZRSxZQUFZLElBQW9DO1FBWGxDLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsY0FBUyxHQUFTLFNBQVMsQ0FBQztRQUM1QixrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUNsQyxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUd2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxRQUFrQjs7WUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdEO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0Y7QUFqQ2U7SUFBYiw0QkFBVSxFQUFFOzt3REFBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOzt3REFBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztxREFBNEI7QUFDM0I7SUFBYiw0QkFBVSxFQUFFOzswREFBaUM7QUFDaEM7SUFBYiw0QkFBVSxFQUFFOztzREFBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOzhCQUFZLElBQUk7d0RBQWE7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOzs0REFBbUM7QUFDbEM7SUFBYiw0QkFBVSxFQUFFOzt1REFBOEI7QUFDN0I7SUFBYiw0QkFBVSxFQUFFOzt3REFBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztxREFBNEI7QUFWM0Msc0RBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXNOb3RFbXB0eSwgdmFsaWRhdGUsIFZhbGlkYXRpb25FcnJvciB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvUGF5bWVudFJlc3BvbnNlU2NoZW1hIHtcclxuICBwYXltZW50SWQ6IG51bWJlcjtcclxuICBhY2NvdW50SWQ6IG51bWJlcjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGJhcmNvZGU6IHN0cmluZztcclxuICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgcmVjaXBpZW50TmFtZTogc3RyaW5nO1xyXG4gIGRpc2NvdW50OiBudW1iZXI7XHJcbiAgdGF4QW1vdW50OiBudW1iZXI7XHJcbiAgYW1vdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2xldG9QYXltZW50UmVzcG9uc2UgaW1wbGVtZW50cyBCb2xldG9QYXltZW50UmVzcG9uc2VTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgcGF5bWVudElkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhY2NvdW50SWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHN0YXR1czogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJhcmNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGV4cGlyZXNBdDogRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHJlY2lwaWVudE5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGRpc2NvdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB0YXhBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJvbGV0b1BheW1lbnRSZXNwb25zZT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG1vZGVsIGlzIHZhbGlkIG9yIGFuIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzIGlmIGludmFsaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3RvU3RyaW5nXSBJZiB0b1N0cmluZyBpcyB0cnVlLCB0aGlzIHdpbGwgcmV0dXJuIGEgZm9ybWF0dGVkIGVycm9yIHN0cmluZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBpc1ZhbGlkKHRvU3RyaW5nPzogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nIHwgdHJ1ZSB8IFZhbGlkYXRpb25FcnJvcltdPiB7XHJcbiAgICBjb25zdCBlcnJvcnMgPSBhd2FpdCB2YWxpZGF0ZSh0aGlzKTtcclxuXHJcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9TdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIGVycm9ycy5tYXAoZXJyb3IgPT4gZXJyb3IudG9TdHJpbmcodHJ1ZSkpLmpvaW4oXCI7IFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZXJyb3JzO1xyXG4gIH1cclxufVxyXG4iXX0=