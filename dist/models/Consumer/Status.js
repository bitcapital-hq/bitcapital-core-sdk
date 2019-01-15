"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsumerStatus;
(function (ConsumerStatus) {
    /* Success states */
    ConsumerStatus["READY"] = "ready";
    ConsumerStatus["REJECTED"] = "rejected";
    /* Pending states */
    ConsumerStatus["PENDING_DOCUMENTS"] = "pending_documents";
    /* Processing states */
    ConsumerStatus["PROCESSING_DOCUMENTS"] = "processing_documents";
    ConsumerStatus["PROCESSING_WALLETS"] = "processing_wallets";
    /* Error states */
    ConsumerStatus["INVALID_DOCUMENTS"] = "invalid_documents";
    ConsumerStatus["MANUAL_VERIFICATION"] = "manual_verification";
    /* Blocked state */
    ConsumerStatus["BLOCKED"] = "blocked";
})(ConsumerStatus = exports.ConsumerStatus || (exports.ConsumerStatus = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Db25zdW1lci9TdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFZLGNBa0JYO0FBbEJELFdBQVksY0FBYztJQUN4QixvQkFBb0I7SUFDcEIsaUNBQWUsQ0FBQTtJQUNmLHVDQUFxQixDQUFBO0lBRXJCLG9CQUFvQjtJQUNwQix5REFBdUMsQ0FBQTtJQUV2Qyx1QkFBdUI7SUFDdkIsK0RBQTZDLENBQUE7SUFDN0MsMkRBQXlDLENBQUE7SUFFekMsa0JBQWtCO0lBQ2xCLHlEQUF1QyxDQUFBO0lBQ3ZDLDZEQUEyQyxDQUFBO0lBRTNDLG1CQUFtQjtJQUNuQixxQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBbEJXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBa0J6QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIENvbnN1bWVyU3RhdHVzIHtcbiAgLyogU3VjY2VzcyBzdGF0ZXMgKi9cbiAgUkVBRFkgPSBcInJlYWR5XCIsXG4gIFJFSkVDVEVEID0gXCJyZWplY3RlZFwiLFxuXG4gIC8qIFBlbmRpbmcgc3RhdGVzICovXG4gIFBFTkRJTkdfRE9DVU1FTlRTID0gXCJwZW5kaW5nX2RvY3VtZW50c1wiLFxuXG4gIC8qIFByb2Nlc3Npbmcgc3RhdGVzICovXG4gIFBST0NFU1NJTkdfRE9DVU1FTlRTID0gXCJwcm9jZXNzaW5nX2RvY3VtZW50c1wiLFxuICBQUk9DRVNTSU5HX1dBTExFVFMgPSBcInByb2Nlc3Npbmdfd2FsbGV0c1wiLFxuXG4gIC8qIEVycm9yIHN0YXRlcyAqL1xuICBJTlZBTElEX0RPQ1VNRU5UUyA9IFwiaW52YWxpZF9kb2N1bWVudHNcIixcbiAgTUFOVUFMX1ZFUklGSUNBVElPTiA9IFwibWFudWFsX3ZlcmlmaWNhdGlvblwiLFxuXG4gIC8qIEJsb2NrZWQgc3RhdGUgKi9cbiAgQkxPQ0tFRCA9IFwiYmxvY2tlZFwiXG59XG4iXX0=