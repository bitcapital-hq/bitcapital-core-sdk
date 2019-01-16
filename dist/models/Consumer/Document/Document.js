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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50L0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQThCO0FBQzlCLDZCQUFtRDtBQUNuRCxxREFBNEY7QUFHNUYsSUFBWSxZQU9YO0FBUEQsV0FBWSxZQUFZO0lBQ3RCLGlDQUFpQixDQUFBO0lBQ2pCLDZDQUE2QixDQUFBO0lBQzdCLHlEQUF5QyxDQUFBO0lBQ3pDLDJEQUEyQyxDQUFBO0lBQzNDLCtEQUErQyxDQUFBO0lBQy9DLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFQVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU92QjtBQUVELElBQVkseUJBaUJYO0FBakJELFdBQVkseUJBQXlCO0lBQ25DLG9EQUF1QixDQUFBO0lBQ3ZCLGdEQUFtQixDQUFBO0lBQ25CLG9EQUF1QixDQUFBO0lBQ3ZCLGtEQUFxQixDQUFBO0lBQ3JCLHNFQUF5QyxDQUFBO0lBQ3pDLDBDQUFhLENBQUE7SUFDYiw4RUFBaUQsQ0FBQTtJQUNqRCxrRUFBcUMsQ0FBQTtJQUNyQyxvRUFBdUMsQ0FBQTtJQUN2Qyw4REFBaUMsQ0FBQTtJQUNqQyxvRUFBdUMsQ0FBQTtJQUN2Qyw0REFBK0IsQ0FBQTtJQUMvQixzRUFBeUMsQ0FBQTtJQUN6Qyx3RUFBMkMsQ0FBQTtJQUMzQyxzRkFBeUQsQ0FBQTtJQUN6RCxzREFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBakJXLHlCQUF5QixHQUF6QixpQ0FBeUIsS0FBekIsaUNBQXlCLFFBaUJwQztBQWFELGNBQXNCLFNBQVEsYUFBUztJQTBCckMsWUFBWSxJQUE2QjtRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUExQmQsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUloQyxTQUFJLEdBQWlCLFNBQVMsQ0FBQztRQUVqQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBSTFDLFVBQUssR0FBWSxTQUFTLENBQUM7UUFJM0IsU0FBSSxHQUFZLFNBQVMsQ0FBQztRQUkxQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBSzVCLGNBQVMsR0FBVSxTQUFTLENBQUM7UUFLM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxZQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjtBQTdCQztJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxDQUFDLFlBQVksQ0FBQzs7c0NBQ1U7QUFFakI7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFJMUM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7dUNBQ2dCO0FBSTNCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O3NDQUNlO0FBSTFCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O3dDQUNpQjtBQUs1QjtJQUhDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFO0lBQ1IseUJBQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsZ0NBQWdDOzs4QkFDekMsSUFBSTsyQ0FBYTtBQXhCL0IsNEJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uLy4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc0VudW0sIElzT3B0aW9uYWwsIElzQmFzZTY0LCBJc0RhdGUsIE1pbkRhdGUgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBEb2N1bWVudFN0YXRlIH0gZnJvbSBcIi4vRG9jdW1lbnRTdGF0ZVwiO1xuXG5leHBvcnQgZW51bSBEb2N1bWVudFR5cGUge1xuICBUQVhfSUQgPSBcInRheF9pZFwiLCAvLyBDUEZcbiAgQlJMX0lERU5USVRZID0gXCJicmxfaWRlbnRpdHlcIixcbiAgQlJMX0lORElWSURVQUxfUkVHID0gXCJicmxfaW5kaXZpZHVhbF9yZWdcIixcbiAgQlJMX0RSSVZFUlNfTElDRU5TRSA9IFwiYnJsX2RyaXZlcnNfbGljZW5zZVwiLFxuICBCUkxfQUREUkVTU19TVEFURU1FTlQgPSBcImJybF9hZGRyZXNzX3N0YXRlbWVudFwiLFxuICBQQVNTUE9SVCA9IFwicGFzc3BvcnRcIlxufVxuXG5leHBvcnQgZW51bSBEb2N1bWVudFZlcmlmaWNhdGlvbkVycm9yIHtcbiAgTk9fTUFUQ0hTID0gXCJub19tYXRjaHNcIixcbiAgSVNfREVBRCA9IFwiaXNfZGVhZFwiLFxuICBTVVNQRU5ERUQgPSBcInN1c3BlbmRlZFwiLFxuICBDQU5DRUxFRCA9IFwiY2FuY2VsZWRcIixcbiAgUEVORElOR19SRUdVTEFUSU9OID0gXCJwZW5kaW5nX3JlZ3VsYXRpb25cIixcbiAgTlVMTCA9IFwibnVsbFwiLFxuICBJTkNPTVBMRVRFX1RBWF9JRF9EQVRBID0gXCJpbmNvbXBsZXRlX3RheF9pZF9kYXRhXCIsXG4gIEZBQ0VfRElETlRfTUFUQ0ggPSBcImZhY2VfZGlkbnRfbWF0Y2hcIixcbiAgUkVDT0dOSVRJT05fRVJST1IgPSBcInJlY29nbml0aW9uX2Vycm9yXCIsXG4gIE5PX0RPQ19QSUNUVVJFID0gXCJub19kb2NfcGljdHVyZVwiLFxuICBOT19GQUNJQUxfUElDVFVSRSA9IFwibm9fZmFjaWFsX3BpY3R1cmVcIixcbiAgTk9fSU5GT19GT1VORCA9IFwibm9faW5mb19mb3VuZFwiLFxuICBET0NfSVNfTk9UX0JBU0VfNjQgPSBcImRvY19pc19ub3RfYmFzZV82NFwiLFxuICBGQUNFX0lTX05PVF9CQVNFXzY0ID0gXCJmYWNlX2lzX25vdF9iYXNlXzY0XCIsXG4gIFBPTElUSUNBTExZX0VYUE9TRURfUEVSU09OID0gXCJwb2xpdGljYWxseV9leHBvc2VkX3BlcnNvblwiLFxuICBTQU5DVElPTkVEID0gXCJzYW5jdGlvbmVkXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXI7XG4gIHR5cGU6IERvY3VtZW50VHlwZTtcbiAgbnVtYmVyPzogc3RyaW5nO1xuICBmcm9udD86IHN0cmluZztcbiAgYmFjaz86IHN0cmluZztcbiAgc2VsZmllPzogc3RyaW5nO1xuICBleHBpcmVzQXQ/OiBEYXRlO1xuICBzdGF0ZXM/OiBEb2N1bWVudFN0YXRlW107XG59XG5cbmV4cG9ydCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIERvY3VtZW50U2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oRG9jdW1lbnRUeXBlKVxuICB0eXBlOiBEb2N1bWVudFR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKSBudW1iZXI/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNCYXNlNjQoKVxuICBmcm9udD86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIGJhY2s/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNCYXNlNjQoKVxuICBzZWxmaWU/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNEYXRlKClcbiAgQE1pbkRhdGUobmV3IERhdGUoKSkgLy8gRG9uJ3QgYWxsb3cgZXhwaXJlZCBkb2N1bWVudHNcbiAgZXhwaXJlc0F0PzogRGF0ZSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPERvY3VtZW50U2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuZXhwaXJlc0F0ID0gZGF0YS5leHBpcmVzQXQgJiYgbmV3IERhdGUoZGF0YS5leHBpcmVzQXQpO1xuICAgIHRoaXMuY29uc3VtZXIgPSBkYXRhLmNvbnN1bWVyICYmIG5ldyBDb25zdW1lcihkYXRhLmNvbnN1bWVyKTtcbiAgfVxufVxuIl19