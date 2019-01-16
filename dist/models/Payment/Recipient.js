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
class Recipient extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.amount = undefined;
        this.destination = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Recipient.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", Object)
], Recipient.prototype, "destination", void 0);
exports.default = Recipient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjaXBpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9QYXltZW50L1JlY2lwaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDBCQUFnRDtBQUVoRCxxREFBcUU7QUFPckUsZUFBK0IsU0FBUSxhQUFTO0lBTzlDLFlBQVksSUFBOEI7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTGQsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUVqQixnQkFBVyxHQUFvQixTQUFTLENBQUM7UUFLakQsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQVZDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7O3lDQUNVO0FBRWpCO0lBQVQsd0JBQU0sRUFBRTs7OENBQTBDO0FBTHJELDRCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi4vV2FsbGV0L1dhbGxldFwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc051bWJlclN0cmluZywgSXNVVUlEIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWNpcGllbnRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIGFtb3VudDogc3RyaW5nO1xyXG4gIGRlc3RpbmF0aW9uOiBXYWxsZXQgfCBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2lwaWVudCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFJlY2lwaWVudFNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc051bWJlclN0cmluZygpXHJcbiAgYW1vdW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc1VVSUQoKSBkZXN0aW5hdGlvbjogV2FsbGV0IHwgc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFJlY2lwaWVudFNjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xyXG4gIH1cclxufVxyXG4iXX0=