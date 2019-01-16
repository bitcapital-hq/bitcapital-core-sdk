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
const __1 = require("..");
const class_validator_1 = require("class-validator");
var ConsumerStatus;
(function (ConsumerStatus) {
    ConsumerStatus["PENDING_DOCUMENTS"] = "pending_documents";
    ConsumerStatus["PENDING_SELFIE"] = "pending_selfie";
    ConsumerStatus["PROCESSING"] = "processing";
    ConsumerStatus["VERIFIED"] = "verified";
    ConsumerStatus["SUSPENDED"] = "suspended";
    ConsumerStatus["DELETED"] = "deleted";
    ConsumerStatus["INVALID_DOCUMENTS"] = "invalid_documennts";
    ConsumerStatus["INVALID_SELFIE"] = "invalid_selfie";
    ConsumerStatus["MANUAL_VERIFICATION"] = "manual_verification";
})(ConsumerStatus = exports.ConsumerStatus || (exports.ConsumerStatus = {}));
class Consumer extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.user = undefined;
        this.userId = undefined;
        this.status = undefined;
        this.taxId = undefined;
        this.documents = undefined;
        this.phones = undefined;
        this.addresses = undefined;
        this.bankings = undefined;
        // Assign all props
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], Consumer.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(ConsumerStatus),
    __metadata("design:type", String)
], Consumer.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Consumer.prototype, "taxId", void 0);
exports.default = Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQXNEO0FBQ3RELHFEQUE2RDtBQUc3RCxJQUFZLGNBVVg7QUFWRCxXQUFZLGNBQWM7SUFDeEIseURBQXVDLENBQUE7SUFDdkMsbURBQWlDLENBQUE7SUFDakMsMkNBQXlCLENBQUE7SUFDekIsdUNBQXFCLENBQUE7SUFDckIseUNBQXVCLENBQUE7SUFDdkIscUNBQW1CLENBQUE7SUFDbkIsMERBQXdDLENBQUE7SUFDeEMsbURBQWlDLENBQUE7SUFDakMsNkRBQTJDLENBQUE7QUFDN0MsQ0FBQyxFQVZXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBVXpCO0FBYUQsY0FBOEIsU0FBUSxhQUFTO0lBZTdDLFlBQVksSUFBNkI7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBZmQsU0FBSSxHQUFVLFNBQVMsQ0FBQztRQUNkLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFJckMsV0FBTSxHQUFtQixTQUFTLENBQUM7UUFFckIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUV4QyxjQUFTLEdBQWdCLFNBQVMsQ0FBQztRQUNuQyxXQUFNLEdBQWEsU0FBUyxDQUFDO1FBQzdCLGNBQVMsR0FBZSxTQUFTLENBQUM7UUFDbEMsYUFBUSxHQUFlLFNBQVMsQ0FBQztRQUkvQixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBbEJXO0lBQVQsd0JBQU0sRUFBRTs7d0NBQTRCO0FBSXJDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsY0FBYyxDQUFDOzt3Q0FDWTtBQUVyQjtJQUFiLDRCQUFVLEVBQUU7O3VDQUEyQjtBQVIxQywyQkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGRyZXNzLCBEb2N1bWVudCwgUGhvbmUgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgVXNlciB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0sIElzVVVJRCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgQmFua2luZyB9IGZyb20gXCIuL0JhbmtpbmdcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENvbnN1bWVyU3RhdHVzIHtcclxuICBQRU5ESU5HX0RPQ1VNRU5UUyA9IFwicGVuZGluZ19kb2N1bWVudHNcIixcclxuICBQRU5ESU5HX1NFTEZJRSA9IFwicGVuZGluZ19zZWxmaWVcIixcclxuICBQUk9DRVNTSU5HID0gXCJwcm9jZXNzaW5nXCIsXHJcbiAgVkVSSUZJRUQgPSBcInZlcmlmaWVkXCIsXHJcbiAgU1VTUEVOREVEID0gXCJzdXNwZW5kZWRcIixcclxuICBERUxFVEVEID0gXCJkZWxldGVkXCIsXHJcbiAgSU5WQUxJRF9ET0NVTUVOVFMgPSBcImludmFsaWRfZG9jdW1lbm50c1wiLFxyXG4gIElOVkFMSURfU0VMRklFID0gXCJpbnZhbGlkX3NlbGZpZVwiLFxyXG4gIE1BTlVBTF9WRVJJRklDQVRJT04gPSBcIm1hbnVhbF92ZXJpZmljYXRpb25cIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnN1bWVyU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcclxuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzO1xyXG4gIHVzZXI/OiBVc2VyO1xyXG4gIHVzZXJJZDogc3RyaW5nO1xyXG4gIGRvY3VtZW50cz86IERvY3VtZW50W107XHJcbiAgcGhvbmVzPzogUGhvbmVbXTtcclxuICBhZGRyZXNzZXM/OiBBZGRyZXNzW107XHJcbiAgYmFua2luZ3M/OiBCYW5raW5nW107XHJcbiAgdGF4SWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3VtZXIgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBDb25zdW1lclNjaGVtYSB7XHJcbiAgdXNlcj86IFVzZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzVVVJRCgpIHVzZXJJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpXHJcbiAgQElzRW51bShDb25zdW1lclN0YXR1cylcclxuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNOb3RFbXB0eSgpIHRheElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGRvY3VtZW50cz86IERvY3VtZW50W10gPSB1bmRlZmluZWQ7XHJcbiAgcGhvbmVzPzogUGhvbmVbXSA9IHVuZGVmaW5lZDtcclxuICBhZGRyZXNzZXM/OiBBZGRyZXNzW10gPSB1bmRlZmluZWQ7XHJcbiAgYmFua2luZ3M/OiBCYW5raW5nW10gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Q29uc3VtZXJTY2hlbWE+KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==