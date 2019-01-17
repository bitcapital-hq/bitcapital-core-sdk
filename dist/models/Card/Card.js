"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
var CardStatus;
(function (CardStatus) {
    CardStatus["AVAIABLE"] = "available";
    CardStatus["BLOCKED"] = "blocked";
    CardStatus["CANCELLED"] = "cancelled";
})(CardStatus = exports.CardStatus || (exports.CardStatus = {}));
class Card extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.user = undefined;
        this.status = undefined;
        Object.assign(this, data);
    }
}
exports.Card = Card;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ2FyZC9DYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMEJBQWdEO0FBRWhELElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNwQixvQ0FBc0IsQ0FBQTtJQUN0QixpQ0FBbUIsQ0FBQTtJQUNuQixxQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFPRCxVQUFrQixTQUFRLGFBQVM7SUFJakMsWUFBWSxJQUF5QjtRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFKZCxTQUFJLEdBQW1CLFNBQVMsQ0FBQztRQUNqQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBSXpCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVJELG9CQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXIgZnJvbSBcIi4uL1VzZXIvVXNlclwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2FyZFN0YXR1cyB7XHJcbiAgQVZBSUFCTEUgPSBcImF2YWlsYWJsZVwiLFxyXG4gIEJMT0NLRUQgPSBcImJsb2NrZWRcIixcclxuICBDQU5DRUxMRUQgPSBcImNhbmNlbGxlZFwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgdXNlcj86IFVzZXIgfCBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQ2FyZFNjaGVtYSB7XHJcbiAgdXNlcj86IFVzZXIgfCBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgc3RhdHVzOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Q2FyZFNjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19