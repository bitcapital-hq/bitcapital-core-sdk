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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQWdEO0FBQ2hELHFEQUFvRztBQUVwRyxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsNkNBQTZCLENBQUE7SUFDN0IseURBQXlDLENBQUE7SUFDekMsK0RBQStDLENBQUE7QUFDakQsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBYUQsY0FBOEIsU0FBUSxhQUFTO0lBMkI3QyxZQUFZLElBQTZCO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQTNCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFJekMsU0FBSSxHQUFpQixTQUFTLENBQUM7UUFJL0IsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUk1QixVQUFLLEdBQVksU0FBUyxDQUFDO1FBRzNCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFHMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUs1QixlQUFVLEdBQVUsU0FBUyxDQUFDO1FBSzVCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUEvQlc7SUFBVCx3QkFBTSxFQUFFOzs0Q0FBZ0M7QUFJekM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxZQUFZLENBQUM7O3NDQUNVO0FBSS9CO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDRCQUFVLEVBQUU7O3dDQUNlO0FBSTVCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O3VDQUNnQjtBQUczQjtJQUZDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFOztzQ0FDZTtBQUcxQjtJQUZDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFOzt3Q0FDaUI7QUFLNUI7SUFIQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sRUFBRTtJQUNSLHlCQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7OzhCQUNqRixJQUFJOzRDQUFhO0FBekJoQywyQkFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdW1lciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNVVUlELCBJc05vdEVtcHR5LCBJc0VudW0sIElzT3B0aW9uYWwsIElzQmFzZTY0LCBJc0RhdGUsIE1heERhdGUgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIERvY3VtZW50VHlwZSB7XG4gIEJSTF9JREVOVElUWSA9IFwiYnJsX2lkZW50aXR5XCIsXG4gIEJSTF9JTkRJVklEVUFMX1JFRyA9IFwiYnJsX2luZGl2aWR1YWxfcmVnXCIsXG4gIEJSTF9BRERSRVNTX1NUQVRFTUVOVCA9IFwiYnJsX2FkZHJlc3Nfc3RhdGVtZW50XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXI7XG4gIGNvbnN1bWVySWQ6IHN0cmluZztcbiAgdHlwZTogRG9jdW1lbnRUeXBlO1xuICBudW1iZXI/OiBzdHJpbmc7XG4gIGZyb250Pzogc3RyaW5nO1xuICBiYWNrPzogc3RyaW5nO1xuICBzZWxmaWU/OiBzdHJpbmc7XG4gIHZlcmlmaWVkQXQ/OiBEYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIERvY3VtZW50U2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcbiAgQElzVVVJRCgpIGNvbnN1bWVySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oRG9jdW1lbnRUeXBlKVxuICB0eXBlOiBEb2N1bWVudFR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNOb3RFbXB0eSgpXG4gIG51bWJlcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIGZyb250Pzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIGJhY2s/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc09wdGlvbmFsKClcbiAgQElzQmFzZTY0KClcbiAgc2VsZmllPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGF0ZSgpXG4gIEBNYXhEYXRlKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNSAqIDYwMDAwKSkgLy8gTm93ICsgNW1pbiBmb3Igc2VydmVyIHRpbWUgZGlmZmVyZW5jZXNcbiAgdmVyaWZpZWRBdD86IERhdGUgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxEb2N1bWVudFNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19