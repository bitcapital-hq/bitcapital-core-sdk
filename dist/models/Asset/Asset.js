"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class Asset extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.name = undefined;
        this.code = undefined;
        this.wallet = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
exports.default = Asset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0Fzc2V0L0Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQXdEO0FBUXhELFdBQTJCLFNBQVEsYUFBUztJQUsxQyxZQUFZLElBQTBCO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxkLFNBQUksR0FBWSxTQUFTLENBQUM7UUFDMUIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixXQUFNLEdBQVksU0FBUyxDQUFDO1FBSzFCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFYRCx3QkFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBXYWxsZXQgfSBmcm9tIFwiLi5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBBc3NldFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgd2FsbGV0PzogV2FsbGV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEFzc2V0U2NoZW1hIHtcbiAgbmFtZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICB3YWxsZXQ/OiBXYWxsZXQgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxBc3NldFNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19