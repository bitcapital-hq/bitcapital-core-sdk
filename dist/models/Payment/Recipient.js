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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjaXBpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9QYXltZW50L1JlY2lwaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDBCQUFnRDtBQUVoRCxxREFBcUU7QUFPckUsZUFBK0IsU0FBUSxhQUFTO0lBTzlDLFlBQVksSUFBOEI7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTGQsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUVqQixnQkFBVyxHQUFvQixTQUFTLENBQUM7UUFLakQsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQVZDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLGdDQUFjLEVBQUU7O3lDQUNVO0FBRWpCO0lBQVQsd0JBQU0sRUFBRTs7OENBQTBDO0FBTHJELDRCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL1dhbGxldC9XYWxsZXRcIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzTnVtYmVyU3RyaW5nLCBJc1VVSUQgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjaXBpZW50U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgYW1vdW50OiBzdHJpbmc7XG4gIGRlc3RpbmF0aW9uOiBXYWxsZXQgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2lwaWVudCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFJlY2lwaWVudFNjaGVtYSB7XG4gIEBJc05vdEVtcHR5KClcbiAgQElzTnVtYmVyU3RyaW5nKClcbiAgYW1vdW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzVVVJRCgpIGRlc3RpbmF0aW9uOiBXYWxsZXQgfCBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxSZWNpcGllbnRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gIH1cbn1cbiJdfQ==