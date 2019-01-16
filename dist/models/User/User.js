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
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["AUDIT"] = "audit";
    UserRole["MEDIATOR"] = "mediator";
    UserRole["CONSUMER"] = "consumer";
    UserRole["PUBLIC"] = "public";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.role = undefined;
        this.status = undefined;
        this.domain = undefined;
        this.password = undefined;
        this.consumer = undefined;
        this.wallets = undefined;
        this.credentials = undefined;
        this.virtual = undefined;
        Object.assign(this, data);
        this.consumer = data.consumer && new __1.Consumer(data.consumer);
        this.wallets = data.wallets && data.wallets.map(wallet => new __1.Wallet(wallet));
        this.credentials = data.credentials && new __1.OAuthCredentials(data.credentials);
        if (data.virtual === undefined && data.credentials !== undefined && data.credentials.virtual !== undefined) {
            this.virtual = data.credentials.virtual;
        }
    }
    get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(UserStatus),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", __1.Domain)
], User.prototype, "domain", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBU1k7QUFDWixxREFBMEU7QUFFMUUsSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLCtCQUFpQixDQUFBO0lBQ2pCLG1DQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVELElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNsQiwyQkFBZSxDQUFBO0lBQ2YsMkJBQWUsQ0FBQTtJQUNmLGlDQUFxQixDQUFBO0lBQ3JCLGlDQUFxQixDQUFBO0lBQ3JCLDZCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQWdCRCxVQUFrQixTQUFRLGFBQVM7SUEwQmpDLFlBQVksSUFBeUI7UUFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBMUJBLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUkzQyxVQUFLLEdBQVcsU0FBUyxDQUFDO1FBSTFCLFNBQUksR0FBYyxTQUFTLENBQUM7UUFJNUIsV0FBTSxHQUFnQixTQUFTLENBQUM7UUFFbEIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUU1QixhQUFRLEdBQVksU0FBUyxDQUFDO1FBRTVDLGFBQVEsR0FBYyxTQUFTLENBQUM7UUFDaEMsWUFBTyxHQUFjLFNBQVMsQ0FBQztRQUMvQixnQkFBVyxHQUFzQixTQUFTLENBQUM7UUFDM0MsWUFBTyxHQUFZLFNBQVMsQ0FBQztRQUszQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxZQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksVUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksb0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlFLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQTFDZTtJQUFiLDRCQUFVLEVBQUU7O3VDQUErQjtBQUU5QjtJQUFiLDRCQUFVLEVBQUU7O3NDQUE4QjtBQUkzQztJQUZDLDRCQUFVLEVBQUU7SUFDWix5QkFBTyxFQUFFOzttQ0FDZ0I7QUFJMUI7SUFGQyw0QkFBVSxFQUFFO0lBQ1osd0JBQU0sQ0FBQyxRQUFRLENBQUM7O2tDQUNXO0FBSTVCO0lBRkMsNEJBQVUsRUFBRTtJQUNaLHdCQUFNLENBQUMsVUFBVSxDQUFDOztvQ0FDYTtBQUVsQjtJQUFiLDRCQUFVLEVBQUU7OEJBQVUsVUFBTTtvQ0FBYTtBQUU1QjtJQUFiLDRCQUFVLEVBQUU7O3NDQUErQjtBQW5COUMsb0JBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQmFzZU1vZGVsLFxuICBCYXNlTW9kZWxTY2hlbWEsXG4gIE9BdXRoQ3JlZGVudGlhbHMsXG4gIERvbWFpbixcbiAgQ29uc3VtZXIsXG4gIFdhbGxldCxcbiAgQ29uc3VtZXJTY2hlbWEsXG4gIFdhbGxldFNjaGVtYVxufSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW1haWwsIElzRW51bSwgSXNPcHRpb25hbCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGVudW0gVXNlclN0YXR1cyB7XG4gIEFDVElWRSA9IFwiYWN0aXZlXCIsXG4gIElOQUNUSVZFID0gXCJpbmFjdGl2ZVwiXG59XG5cbmV4cG9ydCBlbnVtIFVzZXJSb2xlIHtcbiAgQURNSU4gPSBcImFkbWluXCIsXG4gIEFVRElUID0gXCJhdWRpdFwiLFxuICBNRURJQVRPUiA9IFwibWVkaWF0b3JcIixcbiAgQ09OU1VNRVIgPSBcImNvbnN1bWVyXCIsXG4gIFBVQkxJQyA9IFwicHVibGljXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU/OiBVc2VyUm9sZTtcbiAgc3RhdHVzPzogVXNlclN0YXR1cztcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIGNyZWRlbnRpYWxzPzogT0F1dGhDcmVkZW50aWFscztcbiAgZG9tYWluPzogRG9tYWluO1xuICBjb25zdW1lcj86IENvbnN1bWVyU2NoZW1hO1xuICB2aXJ0dWFsPzogYm9vbGVhbjtcbiAgd2FsbGV0cz86IFdhbGxldFNjaGVtYVtdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFVzZXJTY2hlbWEge1xuICBASXNOb3RFbXB0eSgpIGZpcnN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KCkgbGFzdE5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpXG4gIEBJc0VtYWlsKClcbiAgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0VudW0oVXNlclJvbGUpXG4gIHJvbGU/OiBVc2VyUm9sZSA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpXG4gIEBJc0VudW0oVXNlclN0YXR1cylcbiAgc3RhdHVzPzogVXNlclN0YXR1cyA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpIGRvbWFpbj86IERvbWFpbiA9IHVuZGVmaW5lZDtcblxuICBASXNPcHRpb25hbCgpIHBhc3N3b3JkPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG4gIHdhbGxldHM/OiBXYWxsZXRbXSA9IHVuZGVmaW5lZDtcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xuICB2aXJ0dWFsOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlclNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmNvbnN1bWVyID0gZGF0YS5jb25zdW1lciAmJiBuZXcgQ29uc3VtZXIoZGF0YS5jb25zdW1lcik7XG4gICAgdGhpcy53YWxsZXRzID0gZGF0YS53YWxsZXRzICYmIGRhdGEud2FsbGV0cy5tYXAod2FsbGV0ID0+IG5ldyBXYWxsZXQod2FsbGV0KSk7XG4gICAgdGhpcy5jcmVkZW50aWFscyA9IGRhdGEuY3JlZGVudGlhbHMgJiYgbmV3IE9BdXRoQ3JlZGVudGlhbHMoZGF0YS5jcmVkZW50aWFscyk7XG5cbiAgICBpZiAoZGF0YS52aXJ0dWFsID09PSB1bmRlZmluZWQgJiYgZGF0YS5jcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkICYmIGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnZpcnR1YWwgPSBkYXRhLmNyZWRlbnRpYWxzLnZpcnR1YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuZmlyc3ROYW1lfSAke3RoaXMubGFzdE5hbWV9YDtcbiAgfVxufVxuIl19