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
    constructor(data = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0RvY3VtZW50L0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQThCO0FBQzlCLDZCQUFtRDtBQUNuRCxxREFBNEY7QUFHNUYsSUFBWSxZQU9YO0FBUEQsV0FBWSxZQUFZO0lBQ3RCLGlDQUFpQixDQUFBO0lBQ2pCLDZDQUE2QixDQUFBO0lBQzdCLHlEQUF5QyxDQUFBO0lBQ3pDLDJEQUEyQyxDQUFBO0lBQzNDLCtEQUErQyxDQUFBO0lBQy9DLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFQVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU92QjtBQUVELElBQVkseUJBaUJYO0FBakJELFdBQVkseUJBQXlCO0lBQ25DLG9EQUF1QixDQUFBO0lBQ3ZCLGdEQUFtQixDQUFBO0lBQ25CLG9EQUF1QixDQUFBO0lBQ3ZCLGtEQUFxQixDQUFBO0lBQ3JCLHNFQUF5QyxDQUFBO0lBQ3pDLDBDQUFhLENBQUE7SUFDYiw4RUFBaUQsQ0FBQTtJQUNqRCxrRUFBcUMsQ0FBQTtJQUNyQyxvRUFBdUMsQ0FBQTtJQUN2Qyw4REFBaUMsQ0FBQTtJQUNqQyxvRUFBdUMsQ0FBQTtJQUN2Qyw0REFBK0IsQ0FBQTtJQUMvQixzRUFBeUMsQ0FBQTtJQUN6Qyx3RUFBMkMsQ0FBQTtJQUMzQyxzRkFBeUQsQ0FBQTtJQUN6RCxzREFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBakJXLHlCQUF5QixHQUF6QixpQ0FBeUIsS0FBekIsaUNBQXlCLFFBaUJwQztBQWFELGNBQXNCLFNBQVEsYUFBUztJQTBCckMsWUFBWSxPQUFnQyxFQUFFO1FBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQTFCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBSWhDLFNBQUksR0FBaUIsU0FBUyxDQUFDO1FBRWpCLFdBQU0sR0FBWSxTQUFTLENBQUM7UUFJMUMsVUFBSyxHQUFZLFNBQVMsQ0FBQztRQUkzQixTQUFJLEdBQVksU0FBUyxDQUFDO1FBSTFCLFdBQU0sR0FBWSxTQUFTLENBQUM7UUFLNUIsY0FBUyxHQUFVLFNBQVMsQ0FBQztRQUszQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFlBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBN0JDO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsWUFBWSxDQUFDOztzQ0FDVTtBQUVqQjtJQUFiLDRCQUFVLEVBQUU7O3dDQUE2QjtBQUkxQztJQUZDLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFOzt1Q0FDZ0I7QUFJM0I7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7c0NBQ2U7QUFJMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osMEJBQVEsRUFBRTs7d0NBQ2lCO0FBSzVCO0lBSEMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLEVBQUU7SUFDUix5QkFBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7OzhCQUN6QyxJQUFJOzJDQUFhO0FBeEIvQiw0QkFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdW1lciB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi4vLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSwgSXNPcHRpb25hbCwgSXNCYXNlNjQsIElzRGF0ZSwgTWluRGF0ZSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcbmltcG9ydCB7IERvY3VtZW50U3RhdGUgfSBmcm9tIFwiLi9Eb2N1bWVudFN0YXRlXCI7XG5cbmV4cG9ydCBlbnVtIERvY3VtZW50VHlwZSB7XG4gIFRBWF9JRCA9IFwidGF4X2lkXCIsIC8vIENQRlxuICBCUkxfSURFTlRJVFkgPSBcImJybF9pZGVudGl0eVwiLFxuICBCUkxfSU5ESVZJRFVBTF9SRUcgPSBcImJybF9pbmRpdmlkdWFsX3JlZ1wiLFxuICBCUkxfRFJJVkVSU19MSUNFTlNFID0gXCJicmxfZHJpdmVyc19saWNlbnNlXCIsXG4gIEJSTF9BRERSRVNTX1NUQVRFTUVOVCA9IFwiYnJsX2FkZHJlc3Nfc3RhdGVtZW50XCIsXG4gIFBBU1NQT1JUID0gXCJwYXNzcG9ydFwiXG59XG5cbmV4cG9ydCBlbnVtIERvY3VtZW50VmVyaWZpY2F0aW9uRXJyb3Ige1xuICBOT19NQVRDSFMgPSBcIm5vX21hdGNoc1wiLFxuICBJU19ERUFEID0gXCJpc19kZWFkXCIsXG4gIFNVU1BFTkRFRCA9IFwic3VzcGVuZGVkXCIsXG4gIENBTkNFTEVEID0gXCJjYW5jZWxlZFwiLFxuICBQRU5ESU5HX1JFR1VMQVRJT04gPSBcInBlbmRpbmdfcmVndWxhdGlvblwiLFxuICBOVUxMID0gXCJudWxsXCIsXG4gIElOQ09NUExFVEVfVEFYX0lEX0RBVEEgPSBcImluY29tcGxldGVfdGF4X2lkX2RhdGFcIixcbiAgRkFDRV9ESUROVF9NQVRDSCA9IFwiZmFjZV9kaWRudF9tYXRjaFwiLFxuICBSRUNPR05JVElPTl9FUlJPUiA9IFwicmVjb2duaXRpb25fZXJyb3JcIixcbiAgTk9fRE9DX1BJQ1RVUkUgPSBcIm5vX2RvY19waWN0dXJlXCIsXG4gIE5PX0ZBQ0lBTF9QSUNUVVJFID0gXCJub19mYWNpYWxfcGljdHVyZVwiLFxuICBOT19JTkZPX0ZPVU5EID0gXCJub19pbmZvX2ZvdW5kXCIsXG4gIERPQ19JU19OT1RfQkFTRV82NCA9IFwiZG9jX2lzX25vdF9iYXNlXzY0XCIsXG4gIEZBQ0VfSVNfTk9UX0JBU0VfNjQgPSBcImZhY2VfaXNfbm90X2Jhc2VfNjRcIixcbiAgUE9MSVRJQ0FMTFlfRVhQT1NFRF9QRVJTT04gPSBcInBvbGl0aWNhbGx5X2V4cG9zZWRfcGVyc29uXCIsXG4gIFNBTkNUSU9ORUQgPSBcInNhbmN0aW9uZWRcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcbiAgdHlwZTogRG9jdW1lbnRUeXBlO1xuICBudW1iZXI/OiBzdHJpbmc7XG4gIGZyb250Pzogc3RyaW5nO1xuICBiYWNrPzogc3RyaW5nO1xuICBzZWxmaWU/OiBzdHJpbmc7XG4gIGV4cGlyZXNBdD86IERhdGU7XG4gIHN0YXRlcz86IERvY3VtZW50U3RhdGVbXTtcbn1cblxuZXhwb3J0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgRG9jdW1lbnRTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW51bShEb2N1bWVudFR5cGUpXG4gIHR5cGU6IERvY3VtZW50VHlwZSA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpIG51bWJlcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIGZyb250Pzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc09wdGlvbmFsKClcbiAgQElzQmFzZTY0KClcbiAgYmFjaz86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0Jhc2U2NCgpXG4gIHNlbGZpZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0RhdGUoKVxuICBATWluRGF0ZShuZXcgRGF0ZSgpKSAvLyBEb24ndCBhbGxvdyBleHBpcmVkIGRvY3VtZW50c1xuICBleHBpcmVzQXQ/OiBEYXRlID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8RG9jdW1lbnRTY2hlbWE+ID0ge30pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmV4cGlyZXNBdCA9IGRhdGEuZXhwaXJlc0F0ICYmIG5ldyBEYXRlKGRhdGEuZXhwaXJlc0F0KTtcbiAgICB0aGlzLmNvbnN1bWVyID0gZGF0YS5jb25zdW1lciAmJiBuZXcgQ29uc3VtZXIoZGF0YS5jb25zdW1lcik7XG4gIH1cbn1cbiJdfQ==