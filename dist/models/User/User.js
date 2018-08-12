"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.role = undefined;
        this.status = undefined;
        this.password = undefined;
        this.credentials = undefined;
        this.domain = undefined;
        this.consumer = undefined;
        this.virtual = undefined;
        this.wallets = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
        this.virtual =
            data.credentials && data.credentials.virtual ? data.credentials.virtual : data.virtual || this.virtual;
        // Relationship attributes enforcing
        this.credentials = data.credentials
            ? data.credentials instanceof __1.OAuthCredentials
                ? data.credentials
                : new __1.OAuthCredentials(data.credentials)
            : undefined;
    }
    get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQTRGO0FBRTVGLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLFFBS1g7QUFMRCxXQUFZLFFBQVE7SUFDbEIsMkJBQWUsQ0FBQTtJQUNmLDJCQUFlLENBQUE7SUFDZixpQ0FBcUIsQ0FBQTtJQUNyQixpQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFnQkQsVUFBMEIsU0FBUSxhQUFTO0lBYXpDLFlBQVksSUFBeUI7UUFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBYmQsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFDMUIsU0FBSSxHQUFhLFNBQVMsQ0FBQztRQUMzQixXQUFNLEdBQWUsU0FBUyxDQUFDO1FBQy9CLGFBQVEsR0FBWSxTQUFTLENBQUM7UUFDOUIsZ0JBQVcsR0FBc0IsU0FBUyxDQUFDO1FBQzNDLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUNoQyxZQUFPLEdBQVksU0FBUyxDQUFDO1FBQzdCLFlBQU8sR0FBYyxTQUFTLENBQUM7UUFLN0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxPQUFPO1lBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV6RyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxvQkFBZ0I7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDbEIsQ0FBQyxDQUFDLElBQUksb0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBakNELHVCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBPQXV0aENyZWRlbnRpYWxzLCBEb21haW4sIENvbnN1bWVyLCBXYWxsZXQgfSBmcm9tIFwiLi5cIjtcblxuZXhwb3J0IGVudW0gVXNlclN0YXR1cyB7XG4gIEFDVElWRSA9IFwiYWN0aXZlXCIsXG4gIElOQUNUSVZFID0gXCJpbmFjdGl2ZVwiXG59XG5cbmV4cG9ydCBlbnVtIFVzZXJSb2xlIHtcbiAgQURNSU4gPSBcImFkbWluXCIsXG4gIEFVRElUID0gXCJhdWRpdFwiLFxuICBNRURJQVRPUiA9IFwibWVkaWF0b3JcIixcbiAgQ09OU1VNRVIgPSBcImNvbnN1bWVyXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU6IFVzZXJSb2xlO1xuICBzdGF0dXM6IFVzZXJTdGF0dXM7XG4gIHBhc3N3b3JkPzogc3RyaW5nO1xuICBjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHM7XG4gIGRvbWFpbjogRG9tYWluO1xuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICB2aXJ0dWFsPzogYm9vbGVhbjtcbiAgd2FsbGV0cz86IFdhbGxldFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgVXNlclNjaGVtYSB7XG4gIGZpcnN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBsYXN0TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBlbWFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICByb2xlOiBVc2VyUm9sZSA9IHVuZGVmaW5lZDtcbiAgc3RhdHVzOiBVc2VyU3RhdHVzID0gdW5kZWZpbmVkO1xuICBwYXNzd29yZD86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xuICBkb21haW46IERvbWFpbiA9IHVuZGVmaW5lZDtcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcbiAgdmlydHVhbDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcbiAgd2FsbGV0cz86IFdhbGxldFtdID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlclNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcblxuICAgIHRoaXMudmlydHVhbCA9XG4gICAgICBkYXRhLmNyZWRlbnRpYWxzICYmIGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA/IGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA6IGRhdGEudmlydHVhbCB8fCB0aGlzLnZpcnR1YWw7XG5cbiAgICAvLyBSZWxhdGlvbnNoaXAgYXR0cmlidXRlcyBlbmZvcmNpbmdcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gZGF0YS5jcmVkZW50aWFsc1xuICAgICAgPyBkYXRhLmNyZWRlbnRpYWxzIGluc3RhbmNlb2YgT0F1dGhDcmVkZW50aWFsc1xuICAgICAgICA/IGRhdGEuY3JlZGVudGlhbHNcbiAgICAgICAgOiBuZXcgT0F1dGhDcmVkZW50aWFscyhkYXRhLmNyZWRlbnRpYWxzKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICB9XG59XG4iXX0=