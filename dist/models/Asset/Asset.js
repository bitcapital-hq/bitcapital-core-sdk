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
class Asset extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        this.code = undefined;
        this.name = undefined;
        this.issuer = undefined;
        this.wallets = undefined;
        this.payments = undefined;
        Object.assign(this, data);
        this.issuer = data.issuer && new __1.Wallet(data.issuer);
        this.wallets = data.wallets && data.wallets.map(wallet => new __1.Wallet(wallet));
        this.payments = data.payments && data.payments.map(payments => new __1.Payment(payments));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Asset.prototype, "code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
exports.Asset = Asset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0Fzc2V0L0Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQThGO0FBQzlGLHFEQUF5RDtBQVV6RCxXQUFtQixTQUFRLGFBQVM7SUFTbEMsWUFBWSxPQUE2QixFQUFFO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVRBLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFekIsU0FBSSxHQUFZLFNBQVMsQ0FBQztRQUV4QyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLFlBQU8sR0FBYyxTQUFTLENBQUM7UUFDL0IsYUFBUSxHQUFlLFNBQVMsQ0FBQztRQUsvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxVQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksVUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0NBQ0Y7QUFqQmU7SUFBYiw0QkFBVSxFQUFFOzttQ0FBMEI7QUFFekI7SUFBYiw0QkFBVSxFQUFFOzttQ0FBMkI7QUFIMUMsc0JBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEsIFdhbGxldCwgV2FsbGV0U2NoZW1hLCBQYXltZW50U2NoZW1hLCBQYXltZW50IH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc09wdGlvbmFsLCBJc05vdEVtcHR5IH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFzc2V0U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgbmFtZT86IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBpc3N1ZXI6IFdhbGxldFNjaGVtYTtcbiAgd2FsbGV0cz86IFdhbGxldFNjaGVtYVtdO1xuICBwYXltZW50cz86IFBheW1lbnRTY2hlbWFbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEFzc2V0IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQXNzZXRTY2hlbWEge1xuICBASXNOb3RFbXB0eSgpIGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpIG5hbWU/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgaXNzdWVyOiBXYWxsZXQgPSB1bmRlZmluZWQ7XG4gIHdhbGxldHM/OiBXYWxsZXRbXSA9IHVuZGVmaW5lZDtcbiAgcGF5bWVudHM/OiBQYXltZW50W10gPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxBc3NldFNjaGVtYT4gPSB7fSkge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuaXNzdWVyID0gZGF0YS5pc3N1ZXIgJiYgbmV3IFdhbGxldChkYXRhLmlzc3Vlcik7XG4gICAgdGhpcy53YWxsZXRzID0gZGF0YS53YWxsZXRzICYmIGRhdGEud2FsbGV0cy5tYXAod2FsbGV0ID0+IG5ldyBXYWxsZXQod2FsbGV0KSk7XG4gICAgdGhpcy5wYXltZW50cyA9IGRhdGEucGF5bWVudHMgJiYgZGF0YS5wYXltZW50cy5tYXAocGF5bWVudHMgPT4gbmV3IFBheW1lbnQocGF5bWVudHMpKTtcbiAgfVxufVxuIl19