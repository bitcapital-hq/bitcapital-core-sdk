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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMEJBQWdEO0FBQ2hELHFEQUFvRztBQUVwRyxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsNkNBQTZCLENBQUE7SUFDN0IseURBQXlDLENBQUE7SUFDekMsK0RBQStDLENBQUE7QUFDakQsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBYUQsY0FBOEIsU0FBUSxhQUFTO0lBMkI3QyxZQUFZLElBQTZCO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQTNCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFJekMsU0FBSSxHQUFpQixTQUFTLENBQUM7UUFJL0IsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUk1QixVQUFLLEdBQVksU0FBUyxDQUFDO1FBRzNCLFNBQUksR0FBWSxTQUFTLENBQUM7UUFHMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUs1QixlQUFVLEdBQVUsU0FBUyxDQUFDO1FBSzVCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEcsQ0FBQztDQUNGO0FBaENXO0lBQVQsd0JBQU0sRUFBRTs7NENBQWdDO0FBSXpDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsWUFBWSxDQUFDOztzQ0FDVTtBQUkvQjtJQUZDLDRCQUFVLEVBQUU7SUFDWiw0QkFBVSxFQUFFOzt3Q0FDZTtBQUk1QjtJQUZDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFOzt1Q0FDZ0I7QUFHM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7c0NBQ2U7QUFHMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7d0NBQ2lCO0FBSzVCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLEVBQUU7SUFDUix5QkFBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMseUNBQXlDOzs4QkFDakYsSUFBSTs0Q0FBYTtBQXpCaEMsMkJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzVVVJRCwgSXNOb3RFbXB0eSwgSXNFbnVtLCBJc09wdGlvbmFsLCBJc0Jhc2U2NCwgSXNEYXRlLCBNYXhEYXRlIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgZW51bSBEb2N1bWVudFR5cGUge1xuICBCUkxfSURFTlRJVFkgPSBcImJybF9pZGVudGl0eVwiLFxuICBCUkxfSU5ESVZJRFVBTF9SRUcgPSBcImJybF9pbmRpdmlkdWFsX3JlZ1wiLFxuICBCUkxfQUREUkVTU19TVEFURU1FTlQgPSBcImJybF9hZGRyZXNzX3N0YXRlbWVudFwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICBjb25zdW1lcklkOiBzdHJpbmc7XG4gIHR5cGU6IERvY3VtZW50VHlwZTtcbiAgbnVtYmVyPzogc3RyaW5nO1xuICBmcm9udD86IHN0cmluZztcbiAgYmFjaz86IHN0cmluZztcbiAgc2VsZmllPzogc3RyaW5nO1xuICB2ZXJpZmllZEF0PzogRGF0ZSB8IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBEb2N1bWVudFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG4gIEBJc1VVSUQoKSBjb25zdW1lcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKERvY3VtZW50VHlwZSlcbiAgdHlwZTogRG9jdW1lbnRUeXBlID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzTm90RW1wdHkoKVxuICBudW1iZXI/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNCYXNlNjQoKVxuICBmcm9udD86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzT3B0aW9uYWwoKVxuICBASXNCYXNlNjQoKVxuICBiYWNrPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIHNlbGZpZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RhdGUoKVxuICBATWF4RGF0ZShuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDUgKiA2MDAwMCkpIC8vIE5vdyArIDVtaW4gZm9yIHNlcnZlciB0aW1lIGRpZmZlcmVuY2VzXG4gIHZlcmlmaWVkQXQ/OiBEYXRlID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8RG9jdW1lbnRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gICAgdGhpcy52ZXJpZmllZEF0ID0gZGF0YS52ZXJpZmllZEF0IGluc3RhbmNlb2YgRGF0ZSA/IGRhdGEudmVyaWZpZWRBdCA6IG5ldyBEYXRlKGRhdGEudmVyaWZpZWRBdCk7XG4gIH1cbn1cbiJdfQ==