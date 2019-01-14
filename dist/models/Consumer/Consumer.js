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
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Consumer.prototype, "taxId", void 0);
exports.default = Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQXNEO0FBQ3RELHFEQUE2RDtBQUU3RCxJQUFZLGNBVVg7QUFWRCxXQUFZLGNBQWM7SUFDeEIseURBQXVDLENBQUE7SUFDdkMsbURBQWlDLENBQUE7SUFDakMsMkNBQXlCLENBQUE7SUFDekIsdUNBQXFCLENBQUE7SUFDckIseUNBQXVCLENBQUE7SUFDdkIscUNBQW1CLENBQUE7SUFDbkIsMERBQXdDLENBQUE7SUFDeEMsbURBQWlDLENBQUE7SUFDakMsNkRBQTJDLENBQUE7QUFDN0MsQ0FBQyxFQVZXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBVXpCO0FBWUQsY0FBOEIsU0FBUSxhQUFTO0lBYzdDLFlBQVksSUFBNkI7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBZGQsU0FBSSxHQUFVLFNBQVMsQ0FBQztRQUNkLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFJckMsV0FBTSxHQUFtQixTQUFTLENBQUM7UUFFckIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUV4QyxjQUFTLEdBQWdCLFNBQVMsQ0FBQztRQUNuQyxXQUFNLEdBQWEsU0FBUyxDQUFDO1FBQzdCLGNBQVMsR0FBZSxTQUFTLENBQUM7UUFJaEMsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWpCVztJQUFULHdCQUFNLEVBQUU7O3dDQUE0QjtBQUlyQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLGNBQWMsQ0FBQzs7d0NBQ1k7QUFFckI7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBMkI7QUFSMUMsMkJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRkcmVzcywgRG9jdW1lbnQsIFBob25lIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFVzZXIgfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNFbnVtLCBJc1VVSUQgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBDb25zdW1lclN0YXR1cyB7XHJcbiAgUEVORElOR19ET0NVTUVOVFMgPSBcInBlbmRpbmdfZG9jdW1lbnRzXCIsXHJcbiAgUEVORElOR19TRUxGSUUgPSBcInBlbmRpbmdfc2VsZmllXCIsXHJcbiAgUFJPQ0VTU0lORyA9IFwicHJvY2Vzc2luZ1wiLFxyXG4gIFZFUklGSUVEID0gXCJ2ZXJpZmllZFwiLFxyXG4gIFNVU1BFTkRFRCA9IFwic3VzcGVuZGVkXCIsXHJcbiAgREVMRVRFRCA9IFwiZGVsZXRlZFwiLFxyXG4gIElOVkFMSURfRE9DVU1FTlRTID0gXCJpbnZhbGlkX2RvY3VtZW5udHNcIixcclxuICBJTlZBTElEX1NFTEZJRSA9IFwiaW52YWxpZF9zZWxmaWVcIixcclxuICBNQU5VQUxfVkVSSUZJQ0FUSU9OID0gXCJtYW51YWxfdmVyaWZpY2F0aW9uXCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25zdW1lclNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgc3RhdHVzOiBDb25zdW1lclN0YXR1cztcclxuICB1c2VyPzogVXNlcjtcclxuICB1c2VySWQ6IHN0cmluZztcclxuICBkb2N1bWVudHM/OiBEb2N1bWVudFtdO1xyXG4gIHBob25lcz86IFBob25lW107XHJcbiAgYWRkcmVzc2VzPzogQWRkcmVzc1tdO1xyXG4gIHRheElkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN1bWVyIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQ29uc3VtZXJTY2hlbWEge1xyXG4gIHVzZXI/OiBVc2VyID0gdW5kZWZpbmVkO1xyXG4gIEBJc1VVSUQoKSB1c2VySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc0VudW0oQ29uc3VtZXJTdGF0dXMpXHJcbiAgc3RhdHVzOiBDb25zdW1lclN0YXR1cyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzTm90RW1wdHkoKSB0YXhJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBkb2N1bWVudHM/OiBEb2N1bWVudFtdID0gdW5kZWZpbmVkO1xyXG4gIHBob25lcz86IFBob25lW10gPSB1bmRlZmluZWQ7XHJcbiAgYWRkcmVzc2VzPzogQWRkcmVzc1tdID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPENvbnN1bWVyU2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXHJcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcclxuICB9XHJcbn1cclxuIl19