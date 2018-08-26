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
        this.documents = undefined;
        this.phones = undefined;
        this.addresses = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
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
exports.default = Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQXNEO0FBQ3RELHFEQUE2RDtBQUU3RCxJQUFZLGNBVVg7QUFWRCxXQUFZLGNBQWM7SUFDeEIseURBQXVDLENBQUE7SUFDdkMsbURBQWlDLENBQUE7SUFDakMsMkNBQXlCLENBQUE7SUFDekIsdUNBQXFCLENBQUE7SUFDckIseUNBQXVCLENBQUE7SUFDdkIscUNBQW1CLENBQUE7SUFDbkIsMERBQXdDLENBQUE7SUFDeEMsbURBQWlDLENBQUE7SUFDakMsNkRBQTJDLENBQUE7QUFDN0MsQ0FBQyxFQVZXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBVXpCO0FBV0QsY0FBOEIsU0FBUSxhQUFTO0lBWTdDLFlBQVksSUFBNkI7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBWmQsU0FBSSxHQUFVLFNBQVMsQ0FBQztRQUNkLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFJckMsV0FBTSxHQUFtQixTQUFTLENBQUM7UUFFbkMsY0FBUyxHQUFnQixTQUFTLENBQUM7UUFDbkMsV0FBTSxHQUFhLFNBQVMsQ0FBQztRQUM3QixjQUFTLEdBQWUsU0FBUyxDQUFDO1FBSWhDLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFmVztJQUFULHdCQUFNLEVBQUU7O3dDQUE0QjtBQUlyQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGNBQWMsQ0FBQzs7d0NBQ1k7QUFOckMsMkJBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRkcmVzcywgRG9jdW1lbnQsIFBob25lIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBVc2VyIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0sIElzVVVJRCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGVudW0gQ29uc3VtZXJTdGF0dXMge1xuICBQRU5ESU5HX0RPQ1VNRU5UUyA9IFwicGVuZGluZ19kb2N1bWVudHNcIixcbiAgUEVORElOR19TRUxGSUUgPSBcInBlbmRpbmdfc2VsZmllXCIsXG4gIFBST0NFU1NJTkcgPSBcInByb2Nlc3NpbmdcIixcbiAgVkVSSUZJRUQgPSBcInZlcmlmaWVkXCIsXG4gIFNVU1BFTkRFRCA9IFwic3VzcGVuZGVkXCIsXG4gIERFTEVURUQgPSBcImRlbGV0ZWRcIixcbiAgSU5WQUxJRF9ET0NVTUVOVFMgPSBcImludmFsaWRfZG9jdW1lbm50c1wiLFxuICBJTlZBTElEX1NFTEZJRSA9IFwiaW52YWxpZF9zZWxmaWVcIixcbiAgTUFOVUFMX1ZFUklGSUNBVElPTiA9IFwibWFudWFsX3ZlcmlmaWNhdGlvblwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzO1xuICB1c2VyPzogVXNlcjtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIGRvY3VtZW50cz86IERvY3VtZW50W107XG4gIHBob25lcz86IFBob25lW107XG4gIGFkZHJlc3Nlcz86IEFkZHJlc3NbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3VtZXIgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBDb25zdW1lclNjaGVtYSB7XG4gIHVzZXI/OiBVc2VyID0gdW5kZWZpbmVkO1xuICBASXNVVUlEKCkgdXNlcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKENvbnN1bWVyU3RhdHVzKVxuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzID0gdW5kZWZpbmVkO1xuXG4gIGRvY3VtZW50cz86IERvY3VtZW50W10gPSB1bmRlZmluZWQ7XG4gIHBob25lcz86IFBob25lW10gPSB1bmRlZmluZWQ7XG4gIGFkZHJlc3Nlcz86IEFkZHJlc3NbXSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPENvbnN1bWVyU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19