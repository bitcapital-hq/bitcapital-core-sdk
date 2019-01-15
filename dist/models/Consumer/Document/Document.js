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
const __2 = require("../..");
const class_validator_1 = require("class-validator");
var DocumentType;
(function (DocumentType) {
    DocumentType["TAX_ID"] = "tax_id";
    DocumentType["BRL_IDENTITY"] = "brl_identity";
    DocumentType["BRL_INDIVIDUAL_REG"] = "brl_individual_reg";
    DocumentType["BRL_DRIVERS_LICENSE"] = "brl_drivers_license";
    DocumentType["BRL_ADDRESS_STATEMENT"] = "brl_address_statement";
    DocumentType["PASSPORT"] = "passport";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
var DocumentVerificationError;
(function (DocumentVerificationError) {
    DocumentVerificationError["NO_MATCHS"] = "no_matchs";
    DocumentVerificationError["IS_DEAD"] = "is_dead";
    DocumentVerificationError["SUSPENDED"] = "suspended";
    DocumentVerificationError["CANCELED"] = "canceled";
    DocumentVerificationError["PENDING_REGULATION"] = "pending_regulation";
    DocumentVerificationError["NULL"] = "null";
    DocumentVerificationError["INCOMPLETE_TAX_ID_DATA"] = "incomplete_tax_id_data";
    DocumentVerificationError["FACE_DIDNT_MATCH"] = "face_didnt_match";
    DocumentVerificationError["RECOGNITION_ERROR"] = "recognition_error";
    DocumentVerificationError["NO_DOC_PICTURE"] = "no_doc_picture";
    DocumentVerificationError["NO_FACIAL_PICTURE"] = "no_facial_picture";
    DocumentVerificationError["NO_INFO_FOUND"] = "no_info_found";
    DocumentVerificationError["DOC_IS_NOT_BASE_64"] = "doc_is_not_base_64";
    DocumentVerificationError["FACE_IS_NOT_BASE_64"] = "face_is_not_base_64";
    DocumentVerificationError["POLITICALLY_EXPOSED_PERSON"] = "politically_exposed_person";
    DocumentVerificationError["SANCTIONED"] = "sanctioned";
})(DocumentVerificationError = exports.DocumentVerificationError || (exports.DocumentVerificationError = {}));
class Document extends __2.BaseModel {
    constructor(data) {
        super(data);
        this.consumer = undefined;
        this.type = undefined;
        this.number = undefined;
        this.front = undefined;
        this.back = undefined;
        this.selfie = undefined;
        this.expiresAt = undefined;
        Object.assign(this, data);
        this.expiresAt = data.expiresAt && new Date(data.expiresAt);
        this.consumer = data.consumer && new __1.Consumer(data.consumer);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(DocumentType),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
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
    class_validator_1.MinDate(new Date()) // Don't allow expired documents
    ,
    __metadata("design:type", Date)
], Document.prototype, "expiresAt", void 0);
exports.Document = Document;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50L0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQThCO0FBQzlCLDZCQUFtRDtBQUNuRCxxREFBNEY7QUFHNUYsSUFBWSxZQU9YO0FBUEQsV0FBWSxZQUFZO0lBQ3RCLGlDQUFpQixDQUFBO0lBQ2pCLDZDQUE2QixDQUFBO0lBQzdCLHlEQUF5QyxDQUFBO0lBQ3pDLDJEQUEyQyxDQUFBO0lBQzNDLCtEQUErQyxDQUFBO0lBQy9DLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFQVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU92QjtBQUVELElBQVkseUJBaUJYO0FBakJELFdBQVkseUJBQXlCO0lBQ25DLG9EQUF1QixDQUFBO0lBQ3ZCLGdEQUFtQixDQUFBO0lBQ25CLG9EQUF1QixDQUFBO0lBQ3ZCLGtEQUFxQixDQUFBO0lBQ3JCLHNFQUF5QyxDQUFBO0lBQ3pDLDBDQUFhLENBQUE7SUFDYiw4RUFBaUQsQ0FBQTtJQUNqRCxrRUFBcUMsQ0FBQTtJQUNyQyxvRUFBdUMsQ0FBQTtJQUN2Qyw4REFBaUMsQ0FBQTtJQUNqQyxvRUFBdUMsQ0FBQTtJQUN2Qyw0REFBK0IsQ0FBQTtJQUMvQixzRUFBeUMsQ0FBQTtJQUN6Qyx3RUFBMkMsQ0FBQTtJQUMzQyxzRkFBeUQsQ0FBQTtJQUN6RCxzREFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBakJXLHlCQUF5QixHQUF6QixpQ0FBeUIsS0FBekIsaUNBQXlCLFFBaUJwQztBQWFELGNBQXNCLFNBQVEsYUFBUztJQTBCckMsWUFBWSxJQUE2QjtRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUExQmQsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUloQyxTQUFJLEdBQWlCLFNBQVMsQ0FBQztRQUVqQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBSTFDLFVBQUssR0FBWSxTQUFTLENBQUM7UUFJM0IsU0FBSSxHQUFZLFNBQVMsQ0FBQztRQUkxQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBSzVCLGNBQVMsR0FBVSxTQUFTLENBQUM7UUFLM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxZQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjtBQTdCQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFlBQVksQ0FBQzs7c0NBQ1U7QUFFakI7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFJMUM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7dUNBQ2dCO0FBSTNCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O3NDQUNlO0FBSTFCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O3dDQUNpQjtBQUs1QjtJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFO0lBQ1IseUJBQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsZ0NBQWdDOzs4QkFDekMsSUFBSTsyQ0FBYTtBQXhCL0IsNEJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uLy4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0sIElzT3B0aW9uYWwsIElzQmFzZTY0LCBJc0RhdGUsIE1pbkRhdGUgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBEb2N1bWVudFN0YXRlIH0gZnJvbSBcIi4vU3RhdGVcIjtcblxuZXhwb3J0IGVudW0gRG9jdW1lbnRUeXBlIHtcbiAgVEFYX0lEID0gXCJ0YXhfaWRcIiwgLy8gQ1BGXG4gIEJSTF9JREVOVElUWSA9IFwiYnJsX2lkZW50aXR5XCIsXG4gIEJSTF9JTkRJVklEVUFMX1JFRyA9IFwiYnJsX2luZGl2aWR1YWxfcmVnXCIsXG4gIEJSTF9EUklWRVJTX0xJQ0VOU0UgPSBcImJybF9kcml2ZXJzX2xpY2Vuc2VcIixcbiAgQlJMX0FERFJFU1NfU1RBVEVNRU5UID0gXCJicmxfYWRkcmVzc19zdGF0ZW1lbnRcIixcbiAgUEFTU1BPUlQgPSBcInBhc3Nwb3J0XCJcbn1cblxuZXhwb3J0IGVudW0gRG9jdW1lbnRWZXJpZmljYXRpb25FcnJvciB7XG4gIE5PX01BVENIUyA9IFwibm9fbWF0Y2hzXCIsXG4gIElTX0RFQUQgPSBcImlzX2RlYWRcIixcbiAgU1VTUEVOREVEID0gXCJzdXNwZW5kZWRcIixcbiAgQ0FOQ0VMRUQgPSBcImNhbmNlbGVkXCIsXG4gIFBFTkRJTkdfUkVHVUxBVElPTiA9IFwicGVuZGluZ19yZWd1bGF0aW9uXCIsXG4gIE5VTEwgPSBcIm51bGxcIixcbiAgSU5DT01QTEVURV9UQVhfSURfREFUQSA9IFwiaW5jb21wbGV0ZV90YXhfaWRfZGF0YVwiLFxuICBGQUNFX0RJRE5UX01BVENIID0gXCJmYWNlX2RpZG50X21hdGNoXCIsXG4gIFJFQ09HTklUSU9OX0VSUk9SID0gXCJyZWNvZ25pdGlvbl9lcnJvclwiLFxuICBOT19ET0NfUElDVFVSRSA9IFwibm9fZG9jX3BpY3R1cmVcIixcbiAgTk9fRkFDSUFMX1BJQ1RVUkUgPSBcIm5vX2ZhY2lhbF9waWN0dXJlXCIsXG4gIE5PX0lORk9fRk9VTkQgPSBcIm5vX2luZm9fZm91bmRcIixcbiAgRE9DX0lTX05PVF9CQVNFXzY0ID0gXCJkb2NfaXNfbm90X2Jhc2VfNjRcIixcbiAgRkFDRV9JU19OT1RfQkFTRV82NCA9IFwiZmFjZV9pc19ub3RfYmFzZV82NFwiLFxuICBQT0xJVElDQUxMWV9FWFBPU0VEX1BFUlNPTiA9IFwicG9saXRpY2FsbHlfZXhwb3NlZF9wZXJzb25cIixcbiAgU0FOQ1RJT05FRCA9IFwic2FuY3Rpb25lZFwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICB0eXBlOiBEb2N1bWVudFR5cGU7XG4gIG51bWJlcj86IHN0cmluZztcbiAgZnJvbnQ/OiBzdHJpbmc7XG4gIGJhY2s/OiBzdHJpbmc7XG4gIHNlbGZpZT86IHN0cmluZztcbiAgZXhwaXJlc0F0PzogRGF0ZTtcbiAgc3RhdGVzPzogRG9jdW1lbnRTdGF0ZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBEb2N1bWVudFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKVxuICBASXNFbnVtKERvY3VtZW50VHlwZSlcbiAgdHlwZTogRG9jdW1lbnRUeXBlID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKCkgbnVtYmVyPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzQmFzZTY0KClcbiAgZnJvbnQ/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNCYXNlNjQoKVxuICBiYWNrPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzQmFzZTY0KClcbiAgc2VsZmllPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzRGF0ZSgpXG4gIEBNaW5EYXRlKG5ldyBEYXRlKCkpIC8vIERvbid0IGFsbG93IGV4cGlyZWQgZG9jdW1lbnRzXG4gIGV4cGlyZXNBdD86IERhdGUgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxEb2N1bWVudFNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmV4cGlyZXNBdCA9IGRhdGEuZXhwaXJlc0F0ICYmIG5ldyBEYXRlKGRhdGEuZXhwaXJlc0F0KTtcbiAgICB0aGlzLmNvbnN1bWVyID0gZGF0YS5jb25zdW1lciAmJiBuZXcgQ29uc3VtZXIoZGF0YS5jb25zdW1lcik7XG4gIH1cbn1cbiJdfQ==