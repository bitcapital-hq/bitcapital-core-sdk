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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQXNEO0FBQ3RELHFEQUE2RDtBQUU3RCxJQUFZLGNBVVg7QUFWRCxXQUFZLGNBQWM7SUFDeEIseURBQXVDLENBQUE7SUFDdkMsbURBQWlDLENBQUE7SUFDakMsMkNBQXlCLENBQUE7SUFDekIsdUNBQXFCLENBQUE7SUFDckIseUNBQXVCLENBQUE7SUFDdkIscUNBQW1CLENBQUE7SUFDbkIsMERBQXdDLENBQUE7SUFDeEMsbURBQWlDLENBQUE7SUFDakMsNkRBQTJDLENBQUE7QUFDN0MsQ0FBQyxFQVZXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBVXpCO0FBV0QsY0FBOEIsU0FBUSxhQUFTO0lBYTdDLFlBQVksSUFBNkI7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBYmQsU0FBSSxHQUFVLFNBQVMsQ0FBQztRQUV4QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBSTNCLFdBQU0sR0FBbUIsU0FBUyxDQUFDO1FBRW5DLGNBQVMsR0FBZ0IsU0FBUyxDQUFDO1FBQ25DLFdBQU0sR0FBYSxTQUFTLENBQUM7UUFDN0IsY0FBUyxHQUFlLFNBQVMsQ0FBQztRQUloQyxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUNGO0FBZkM7SUFEQyx3QkFBTSxFQUFFOzt3Q0FDa0I7QUFJM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxjQUFjLENBQUM7O3dDQUNZO0FBUHJDLDJCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkZHJlc3MsIERvY3VtZW50LCBQaG9uZSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgVXNlciB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNFbnVtLCBJc1VVSUQgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIENvbnN1bWVyU3RhdHVzIHtcbiAgUEVORElOR19ET0NVTUVOVFMgPSBcInBlbmRpbmdfZG9jdW1lbnRzXCIsXG4gIFBFTkRJTkdfU0VMRklFID0gXCJwZW5kaW5nX3NlbGZpZVwiLFxuICBQUk9DRVNTSU5HID0gXCJwcm9jZXNzaW5nXCIsXG4gIFZFUklGSUVEID0gXCJ2ZXJpZmllZFwiLFxuICBTVVNQRU5ERUQgPSBcInN1c3BlbmRlZFwiLFxuICBERUxFVEVEID0gXCJkZWxldGVkXCIsXG4gIElOVkFMSURfRE9DVU1FTlRTID0gXCJpbnZhbGlkX2RvY3VtZW5udHNcIixcbiAgSU5WQUxJRF9TRUxGSUUgPSBcImludmFsaWRfc2VsZmllXCIsXG4gIE1BTlVBTF9WRVJJRklDQVRJT04gPSBcIm1hbnVhbF92ZXJpZmljYXRpb25cIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnN1bWVyU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgc3RhdHVzOiBDb25zdW1lclN0YXR1cztcbiAgdXNlcj86IFVzZXI7XG4gIHVzZXJJZDogc3RyaW5nO1xuICBkb2N1bWVudHM/OiBEb2N1bWVudFtdO1xuICBwaG9uZXM/OiBQaG9uZVtdO1xuICBhZGRyZXNzZXM/OiBBZGRyZXNzW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN1bWVyIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQ29uc3VtZXJTY2hlbWEge1xuICB1c2VyPzogVXNlciA9IHVuZGVmaW5lZDtcbiAgQElzVVVJRCgpXG4gIHVzZXJJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBcbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKENvbnN1bWVyU3RhdHVzKVxuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzID0gdW5kZWZpbmVkO1xuXG4gIGRvY3VtZW50cz86IERvY3VtZW50W10gPSB1bmRlZmluZWQ7XG4gIHBob25lcz86IFBob25lW10gPSB1bmRlZmluZWQ7XG4gIGFkZHJlc3Nlcz86IEFkZHJlc3NbXSA9IHVuZGVmaW5lZDtcbiAgXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Q29uc3VtZXJTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xuICB9XG59XG4iXX0=