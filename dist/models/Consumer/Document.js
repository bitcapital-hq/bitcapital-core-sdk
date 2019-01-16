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
var DocumentType;
(function (DocumentType) {
    DocumentType["BRL_IDENTITY"] = "brl_identity";
    DocumentType["BRL_INDIVIDUAL_REG"] = "brl_individual_reg";
    DocumentType["BRL_ADDRESS_STATEMENT"] = "brl_address_statement";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
class Document extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.consumer = undefined;
        this.consumerId = undefined;
        this.type = undefined;
        this.number = undefined;
        this.front = undefined;
        this.back = undefined;
        this.selfie = undefined;
        this.verifiedAt = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
        this.verifiedAt = data.verifiedAt instanceof Date ? data.verifiedAt : new Date(data.verifiedAt);
    }
}
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], Document.prototype, "consumerId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(DocumentType),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Document.prototype, "number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBase64(),
    __metadata("design:type", String)
], Document.prototype, "front", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBase64(),
    __metadata("design:type", String)
], Document.prototype, "back", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBase64(),
    __metadata("design:type", String)
], Document.prototype, "selfie", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    class_validator_1.MaxDate(new Date(new Date().getTime() + 5 * 60000)) // Now + 5min for server time differences
    ,
    __metadata("design:type", Date)
], Document.prototype, "verifiedAt", void 0);
exports.default = Document;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQWdEO0FBQ2hELHFEQUFvRztBQUVwRyxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsNkNBQTZCLENBQUE7SUFDN0IseURBQXlDLENBQUE7SUFDekMsK0RBQStDLENBQUE7QUFDakQsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBYUQsY0FBOEIsU0FBUSxhQUFTO0lBMkI3QyxZQUFZLElBQTZCO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQTNCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFJekMsU0FBSSxHQUFpQixTQUFTLENBQUM7UUFJL0IsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUk1QixVQUFLLEdBQVksU0FBUyxDQUFDO1FBRzNCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFHMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUs1QixlQUFVLEdBQVUsU0FBUyxDQUFDO1FBSzVCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEcsQ0FBQztDQUNGO0FBaENXO0lBQVQsd0JBQU0sRUFBRTs7NENBQWdDO0FBSXpDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsWUFBWSxDQUFDOztzQ0FDVTtBQUkvQjtJQUZDLDRCQUFVLEVBQUU7SUFDWiw0QkFBVSxFQUFFOzt3Q0FDZTtBQUk1QjtJQUZDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFOzt1Q0FDZ0I7QUFHM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7c0NBQ2U7QUFHMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7d0NBQ2lCO0FBSzVCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLEVBQUU7SUFDUix5QkFBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMseUNBQXlDOzs4QkFDakYsSUFBSTs0Q0FBYTtBQXpCaEMsMkJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBJc1VVSUQsIElzTm90RW1wdHksIElzRW51bSwgSXNPcHRpb25hbCwgSXNCYXNlNjQsIElzRGF0ZSwgTWF4RGF0ZSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBlbnVtIERvY3VtZW50VHlwZSB7XHJcbiAgQlJMX0lERU5USVRZID0gXCJicmxfaWRlbnRpdHlcIixcclxuICBCUkxfSU5ESVZJRFVBTF9SRUcgPSBcImJybF9pbmRpdmlkdWFsX3JlZ1wiLFxyXG4gIEJSTF9BRERSRVNTX1NUQVRFTUVOVCA9IFwiYnJsX2FkZHJlc3Nfc3RhdGVtZW50XCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcclxuICBjb25zdW1lcklkPzogc3RyaW5nO1xyXG4gIHR5cGU6IERvY3VtZW50VHlwZTtcclxuICBudW1iZXI/OiBzdHJpbmc7XHJcbiAgZnJvbnQ/OiBzdHJpbmc7XHJcbiAgYmFjaz86IHN0cmluZztcclxuICBzZWxmaWU/OiBzdHJpbmc7XHJcbiAgdmVyaWZpZWRBdD86IERhdGUgfCBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgRG9jdW1lbnRTY2hlbWEge1xyXG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzVVVJRCgpIGNvbnN1bWVySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc0VudW0oRG9jdW1lbnRUeXBlKVxyXG4gIHR5cGU6IERvY3VtZW50VHlwZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc05vdEVtcHR5KClcclxuICBudW1iZXI/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNCYXNlNjQoKVxyXG4gIGZyb250Pzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNCYXNlNjQoKVxyXG4gIGJhY2s/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0Jhc2U2NCgpXHJcbiAgc2VsZmllPzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzRGF0ZSgpXHJcbiAgQE1heERhdGUobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyA1ICogNjAwMDApKSAvLyBOb3cgKyA1bWluIGZvciBzZXJ2ZXIgdGltZSBkaWZmZXJlbmNlc1xyXG4gIHZlcmlmaWVkQXQ/OiBEYXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPERvY3VtZW50U2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XHJcbiAgICB0aGlzLnZlcmlmaWVkQXQgPSBkYXRhLnZlcmlmaWVkQXQgaW5zdGFuY2VvZiBEYXRlID8gZGF0YS52ZXJpZmllZEF0IDogbmV3IERhdGUoZGF0YS52ZXJpZmllZEF0KTtcclxuICB9XHJcbn1cclxuIl19