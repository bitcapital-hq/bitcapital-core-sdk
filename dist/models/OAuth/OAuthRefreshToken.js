"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class OAuthRefreshToken extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.refreshToken = data.refreshToken;
        this.expires = data.expires;
        this.user = data.user;
        this.client = data.client;
        this.accessToken = data.accessToken;
    }
}
exports.OAuthRefreshToken = OAuthRefreshToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhSZWZyZXNoVG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL09BdXRoL09BdXRoUmVmcmVzaFRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQXNEO0FBWXRELHVCQUErQixTQUFRLGFBQVM7SUFROUMsWUFBWSxJQUFnQztRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFsQkQsOENBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgQmFzZU1vZGVsU2NoZW1hLCBCYXNlTW9kZWwgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IE9BdXRoQ2xpZW50LCBPQXV0aEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFJlZnJlc2hUb2tlblNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGlkOiBzdHJpbmc7XG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nO1xuICBleHBpcmVzOiBEYXRlO1xuICB1c2VyOiBVc2VyO1xuICBjbGllbnQ6IE9BdXRoQ2xpZW50O1xuICBhY2Nlc3NUb2tlbjogT0F1dGhBY2Nlc3NUb2tlbjtcbn1cblxuZXhwb3J0IGNsYXNzIE9BdXRoUmVmcmVzaFRva2VuIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgT0F1dGhSZWZyZXNoVG9rZW5TY2hlbWEge1xuICBpZDogc3RyaW5nO1xuICByZWZyZXNoVG9rZW46IHN0cmluZztcbiAgZXhwaXJlczogRGF0ZTtcbiAgdXNlcjogVXNlcjtcbiAgY2xpZW50OiBPQXV0aENsaWVudDtcbiAgYWNjZXNzVG9rZW46IE9BdXRoQWNjZXNzVG9rZW47XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxPQXV0aFJlZnJlc2hUb2tlbj4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMucmVmcmVzaFRva2VuID0gZGF0YS5yZWZyZXNoVG9rZW47XG4gICAgdGhpcy5leHBpcmVzID0gZGF0YS5leHBpcmVzO1xuICAgIHRoaXMudXNlciA9IGRhdGEudXNlcjtcbiAgICB0aGlzLmNsaWVudCA9IGRhdGEuY2xpZW50O1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc1Rva2VuO1xuICB9XG59XG4iXX0=