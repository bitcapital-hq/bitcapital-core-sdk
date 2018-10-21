"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class RequestUtil {
    /**
     * Generates headers for request signing.
     */
    static sign(secret, req) {
        const now = Date.now();
        const payload = [req.method, req.url, now];
        // Check if should sign body as well
        if (req.method.toUpperCase() === "POST" || req.method.toUpperCase() === "PUT") {
            payload.push(req.body);
        }
        // Generate signature using HMAC SHA 256
        const signature = CryptoJS.HmacSHA256(payload.join(","), secret);
        return {
            "X-Request-Signature": signature.toString(),
            "X-Request-Timestamp": now.toString()
        };
    }
}
exports.default = RequestUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNDO0FBT3RDO0lBQ0U7O09BRUc7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQWMsRUFBRSxHQUFtRDtRQUNwRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0Msb0NBQW9DO1FBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDN0UsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7UUFFRCx3Q0FBd0M7UUFDeEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpFLE9BQU87WUFDTCxxQkFBcUIsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7U0FDdEMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJCRCw4QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tIFwiY3J5cHRvLWpzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNpZ25pbmdIZWFkZXJzIHtcbiAgXCJYLVJlcXVlc3QtU2lnbmF0dXJlXCI6IHN0cmluZztcbiAgXCJYLVJlcXVlc3QtVGltZXN0YW1wXCI6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdFV0aWwge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGhlYWRlcnMgZm9yIHJlcXVlc3Qgc2lnbmluZy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2lnbihzZWNyZXQ6IHN0cmluZywgcmVxOiB7IG1ldGhvZDogc3RyaW5nOyB1cmw6IHN0cmluZzsgYm9keT86IHN0cmluZyB9KTogUmVxdWVzdFNpZ25pbmdIZWFkZXJzIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBbcmVxLm1ldGhvZCwgcmVxLnVybCwgbm93XTtcblxuICAgIC8vIENoZWNrIGlmIHNob3VsZCBzaWduIGJvZHkgYXMgd2VsbFxuICAgIGlmIChyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09IFwiUE9TVFwiIHx8IHJlcS5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gXCJQVVRcIikge1xuICAgICAgcGF5bG9hZC5wdXNoKHJlcS5ib2R5KTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBzaWduYXR1cmUgdXNpbmcgSE1BQyBTSEEgMjU2XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihwYXlsb2FkLmpvaW4oXCIsXCIpLCBzZWNyZXQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIFwiWC1SZXF1ZXN0LVNpZ25hdHVyZVwiOiBzaWduYXR1cmUudG9TdHJpbmcoKSxcbiAgICAgIFwiWC1SZXF1ZXN0LVRpbWVzdGFtcFwiOiBub3cudG9TdHJpbmcoKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==