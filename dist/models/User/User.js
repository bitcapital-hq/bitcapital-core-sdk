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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQW9GO0FBRXBGLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLFFBS1g7QUFMRCxXQUFZLFFBQVE7SUFDbEIsMkJBQWUsQ0FBQTtJQUNmLDJCQUFlLENBQUE7SUFDZixpQ0FBcUIsQ0FBQTtJQUNyQixpQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFlRCxVQUEwQixTQUFRLGFBQVM7SUFZekMsWUFBWSxJQUF5QjtRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFaZCxjQUFTLEdBQVcsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQWEsU0FBUyxDQUFDO1FBQzNCLFdBQU0sR0FBZSxTQUFTLENBQUM7UUFDL0IsYUFBUSxHQUFZLFNBQVMsQ0FBQztRQUM5QixnQkFBVyxHQUFzQixTQUFTLENBQUM7UUFDM0MsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixhQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ2hDLFlBQU8sR0FBWSxTQUFTLENBQUM7UUFLM0IsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxPQUFPO1lBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV6RyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxvQkFBZ0I7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDbEIsQ0FBQyxDQUFDLElBQUksb0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBaENELHVCQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBPQXV0aENyZWRlbnRpYWxzLCBEb21haW4sIENvbnN1bWVyIH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCBlbnVtIFVzZXJTdGF0dXMge1xuICBBQ1RJVkUgPSBcImFjdGl2ZVwiLFxuICBJTkFDVElWRSA9IFwiaW5hY3RpdmVcIlxufVxuXG5leHBvcnQgZW51bSBVc2VyUm9sZSB7XG4gIEFETUlOID0gXCJhZG1pblwiLFxuICBBVURJVCA9IFwiYXVkaXRcIixcbiAgTUVESUFUT1IgPSBcIm1lZGlhdG9yXCIsXG4gIENPTlNVTUVSID0gXCJjb25zdW1lclwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuICBsYXN0TmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgc3RhdHVzOiBVc2VyU3RhdHVzO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzO1xuICBkb21haW46IERvbWFpbjtcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcbiAgdmlydHVhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBVc2VyU2NoZW1hIHtcbiAgZmlyc3ROYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIGxhc3ROYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIHJvbGU6IFVzZXJSb2xlID0gdW5kZWZpbmVkO1xuICBzdGF0dXM6IFVzZXJTdGF0dXMgPSB1bmRlZmluZWQ7XG4gIHBhc3N3b3JkPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gIGRvbWFpbjogRG9tYWluID0gdW5kZWZpbmVkO1xuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuICB2aXJ0dWFsOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlclNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcblxuICAgIHRoaXMudmlydHVhbCA9XG4gICAgICBkYXRhLmNyZWRlbnRpYWxzICYmIGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA/IGRhdGEuY3JlZGVudGlhbHMudmlydHVhbCA6IGRhdGEudmlydHVhbCB8fCB0aGlzLnZpcnR1YWw7XG5cbiAgICAvLyBSZWxhdGlvbnNoaXAgYXR0cmlidXRlcyBlbmZvcmNpbmdcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gZGF0YS5jcmVkZW50aWFsc1xuICAgICAgPyBkYXRhLmNyZWRlbnRpYWxzIGluc3RhbmNlb2YgT0F1dGhDcmVkZW50aWFsc1xuICAgICAgICA/IGRhdGEuY3JlZGVudGlhbHNcbiAgICAgICAgOiBuZXcgT0F1dGhDcmVkZW50aWFscyhkYXRhLmNyZWRlbnRpYWxzKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICB9XG59XG4iXX0=