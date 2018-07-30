"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
var OAuthClientStatus;
(function (OAuthClientStatus) {
    OAuthClientStatus["ACTIVE"] = "active";
    OAuthClientStatus["INACTIVE"] = "inactive";
})(OAuthClientStatus = exports.OAuthClientStatus || (exports.OAuthClientStatus = {}));
class OAuthAccessToken extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.accessToken = data.accessToken;
        this.tokenType = data.tokenType;
        this.userAgent = data.userAgent || {};
        this.expires = data.expires ? new Date(data.expires) : undefined;
        if (data.client) {
            this.client = typeof data.client === typeof "a" ? data.client : new _1.OAuthClient(data.client);
        }
        if (data.user) {
            this.user = typeof data.user === typeof "a" ? data.user : new __1.User(data.user);
        }
    }
}
exports.default = OAuthAccessToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhBY2Nlc3NUb2tlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvT0F1dGgvT0F1dGhBY2Nlc3NUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUFtRDtBQUNuRCwwQkFBc0Q7QUFFdEQsSUFBWSxpQkFHWDtBQUhELFdBQVksaUJBQWlCO0lBQzNCLHNDQUFpQixDQUFBO0lBQ2pCLDBDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUc1QjtBQW9CRCxzQkFBc0MsU0FBUSxhQUFTO0lBUXJELFlBQVksSUFBNEI7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFakUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLElBQUksY0FBVyxDQUFDLElBQUksQ0FBQyxNQUFhLENBQVMsQ0FBQztTQUM5RztRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQUksQ0FBQyxJQUFJLENBQUMsSUFBWSxDQUFDLENBQUM7U0FDdkY7SUFDSCxDQUFDO0NBQ0Y7QUF0QkQsbUNBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0F1dGhDbGllbnQsIE9BdXRoQ2xpZW50U2NoZW1hIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBVc2VyIH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCBlbnVtIE9BdXRoQ2xpZW50U3RhdHVzIHtcbiAgQUNUSVZFID0gXCJhY3RpdmVcIixcbiAgSU5BQ1RJVkUgPSBcImluYWN0aXZlXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyQWdlbnRJbmZvcm1hdGlvbiB7XG4gIGlwPzogc3RyaW5nO1xuICBicm93c2VyPzogc3RyaW5nO1xuICB2ZXJzaW9uPzogc3RyaW5nO1xuICBvcz86IHN0cmluZztcbiAgcGxhdGZvcm0/OiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPQXV0aEFjY2Vzc1Rva2VuU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIHRva2VuVHlwZTogc3RyaW5nO1xuICBjbGllbnQ6IHN0cmluZyB8IE9BdXRoQ2xpZW50U2NoZW1hO1xuICB1c2VyOiBzdHJpbmcgfCBVc2VyO1xuICBleHBpcmVzPzogRGF0ZTtcbiAgdXNlckFnZW50PzogVXNlckFnZW50SW5mb3JtYXRpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoQWNjZXNzVG9rZW4gZXh0ZW5kcyBCYXNlTW9kZWwge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgdG9rZW5UeXBlOiBzdHJpbmc7XG4gIGNsaWVudDogc3RyaW5nIHwgT0F1dGhDbGllbnQ7XG4gIHVzZXI6IHN0cmluZyB8IFVzZXI7XG4gIGV4cGlyZXM/OiBEYXRlO1xuICB1c2VyQWdlbnQ6IFVzZXJBZ2VudEluZm9ybWF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IE9BdXRoQWNjZXNzVG9rZW5TY2hlbWEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NUb2tlbjtcbiAgICB0aGlzLnRva2VuVHlwZSA9IGRhdGEudG9rZW5UeXBlO1xuICAgIHRoaXMudXNlckFnZW50ID0gZGF0YS51c2VyQWdlbnQgfHwge307XG4gICAgdGhpcy5leHBpcmVzID0gZGF0YS5leHBpcmVzID8gbmV3IERhdGUoZGF0YS5leHBpcmVzKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChkYXRhLmNsaWVudCkge1xuICAgICAgdGhpcy5jbGllbnQgPSB0eXBlb2YgZGF0YS5jbGllbnQgPT09IHR5cGVvZiBcImFcIiA/IGRhdGEuY2xpZW50IDogKG5ldyBPQXV0aENsaWVudChkYXRhLmNsaWVudCBhcyBhbnkpIGFzIGFueSk7XG4gICAgfVxuICAgIGlmIChkYXRhLnVzZXIpIHtcbiAgICAgIHRoaXMudXNlciA9IHR5cGVvZiBkYXRhLnVzZXIgPT09IHR5cGVvZiBcImFcIiA/IGRhdGEudXNlciA6IG5ldyBVc2VyKGRhdGEudXNlciBhcyBVc2VyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==