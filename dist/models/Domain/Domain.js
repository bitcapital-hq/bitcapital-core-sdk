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
const _1 = require(".");
const __1 = require("..");
const class_validator_1 = require("class-validator");
var DomainRole;
(function (DomainRole) {
    DomainRole["ROOT"] = "root";
    DomainRole["COMMON"] = "common";
})(DomainRole = exports.DomainRole || (exports.DomainRole = {}));
class Domain extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        this.name = undefined;
        this.role = undefined;
        this.urls = undefined;
        this.test = undefined;
        this.users = undefined;
        this.settings = undefined;
        Object.assign(this, data);
        this.users = data.users && data.users.map(user => new __1.User(user));
        this.settings = data.settings && new _1.DomainSettings(data.settings);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Domain.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(DomainRole),
    __metadata("design:type", String)
], Domain.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsFQDN({}, { each: true }),
    __metadata("design:type", Array)
], Domain.prototype, "urls", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], Domain.prototype, "postbackUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], Domain.prototype, "test", void 0);
exports.Domain = Domain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Eb21haW4vRG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBQXlEO0FBQ3pELDBCQUFrRTtBQUNsRSxxREFBeUU7QUFFekUsSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFZRCxZQUFvQixTQUFRLGFBQVM7SUFvQm5DLFlBQVksT0FBOEIsRUFBRTtRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFwQkEsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl2QyxTQUFJLEdBQWUsU0FBUyxDQUFDO1FBSTdCLFNBQUksR0FBYyxTQUFTLENBQUM7UUFNZCxTQUFJLEdBQVksU0FBUyxDQUFDO1FBRXhDLFVBQUssR0FBWSxTQUFTLENBQUM7UUFDM0IsYUFBUSxHQUFtQixTQUFTLENBQUM7UUFLbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxpQkFBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUEzQmU7SUFBYiw0QkFBVSxFQUFFOztvQ0FBMEI7QUFJdkM7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxVQUFVLENBQUM7O29DQUNVO0FBSTdCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOztvQ0FDQztBQUk1QjtJQUZDLDRCQUFVLEVBQUU7SUFDWix3QkFBTSxFQUFFOzsyQ0FDWTtBQUVQO0lBQWIsNEJBQVUsRUFBRTs7b0NBQTJCO0FBZjFDLHdCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbWFpblNldHRpbmdzLCBEb21haW5TZXR0aW5nc1NjaGVtYSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSwgVXNlciwgVXNlclNjaGVtYSB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNFbnVtLCBJc0ZRRE4sIElzT3B0aW9uYWwgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIERvbWFpblJvbGUge1xuICBST09UID0gXCJyb290XCIsXG4gIENPTU1PTiA9IFwiY29tbW9uXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5TY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJvbGU6IERvbWFpblJvbGU7XG4gIHRlc3Q6IGJvb2xlYW47XG4gIHVybHM/OiBzdHJpbmdbXTtcbiAgcG9zdGJhY2tVcmw/OiBzdHJpbmc7XG4gIHVzZXJzPzogVXNlclNjaGVtYVtdO1xuICBzZXR0aW5nczogRG9tYWluU2V0dGluZ3NTY2hlbWE7XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW4gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBEb21haW5TY2hlbWEge1xuICBASXNOb3RFbXB0eSgpIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VudW0oRG9tYWluUm9sZSlcbiAgcm9sZTogRG9tYWluUm9sZSA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0ZRRE4oe30sIHsgZWFjaDogdHJ1ZSB9KVxuICB1cmxzPzogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgQElzT3B0aW9uYWwoKVxuICBASXNGUUROKClcbiAgcG9zdGJhY2tVcmw/OiBzdHJpbmc7XG5cbiAgQElzTm90RW1wdHkoKSB0ZXN0OiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIHVzZXJzPzogVXNlcltdID0gdW5kZWZpbmVkO1xuICBzZXR0aW5nczogRG9tYWluU2V0dGluZ3MgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxEb21haW5TY2hlbWE+ID0ge30pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLnVzZXJzID0gZGF0YS51c2VycyAmJiBkYXRhLnVzZXJzLm1hcCh1c2VyID0+IG5ldyBVc2VyKHVzZXIpKTtcbiAgICB0aGlzLnNldHRpbmdzID0gZGF0YS5zZXR0aW5ncyAmJiBuZXcgRG9tYWluU2V0dGluZ3MoZGF0YS5zZXR0aW5ncyk7XG4gIH1cbn1cbiJdfQ==