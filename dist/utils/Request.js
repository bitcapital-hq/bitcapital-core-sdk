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
        if (req.method.toUpperCase() === 'POST' || req.method.toUpperCase() === 'PUT') {
            payload.push(req.body);
        }
        // Generate signature using HMAC SHA 256
        const signature = CryptoJS.HmacSHA256(payload.join(','), secret);
        return {
            'X-Request-Signature': signature.toString(),
            'X-Request-Timestamp': now.toString(),
        };
    }
}
exports.default = RequestUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNDO0FBT3RDO0lBQ0U7O09BRUc7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQWMsRUFBRSxHQUFtRDtRQUNwRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0Msb0NBQW9DO1FBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDN0UsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7UUFFRCx3Q0FBd0M7UUFDeEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpFLE9BQU87WUFDTCxxQkFBcUIsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7U0FDdEMsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQXJCRCw4QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tICdjcnlwdG8tanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTaWduaW5nSGVhZGVycyB7XG4gICdYLVJlcXVlc3QtU2lnbmF0dXJlJzogc3RyaW5nLFxuICAnWC1SZXF1ZXN0LVRpbWVzdGFtcCc6IHN0cmluZyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdFV0aWwge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGhlYWRlcnMgZm9yIHJlcXVlc3Qgc2lnbmluZy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2lnbihzZWNyZXQ6IHN0cmluZywgcmVxOiB7IG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgYm9keT86IHN0cmluZyB9KTogUmVxdWVzdFNpZ25pbmdIZWFkZXJzIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBbcmVxLm1ldGhvZCwgcmVxLnVybCwgbm93XTtcblxuICAgIC8vIENoZWNrIGlmIHNob3VsZCBzaWduIGJvZHkgYXMgd2VsbFxuICAgIGlmIChyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQT1NUJyB8fCByZXEubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQVVQnKSB7XG4gICAgICBwYXlsb2FkLnB1c2gocmVxLmJvZHkpO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHNpZ25hdHVyZSB1c2luZyBITUFDIFNIQSAyNTZcbiAgICBjb25zdCBzaWduYXR1cmUgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KHBheWxvYWQuam9pbignLCcpLCBzZWNyZXQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICdYLVJlcXVlc3QtU2lnbmF0dXJlJzogc2lnbmF0dXJlLnRvU3RyaW5nKCksXG4gICAgICAnWC1SZXF1ZXN0LVRpbWVzdGFtcCc6IG5vdy50b1N0cmluZygpLFxuICAgIH1cbiAgfVxufSJdfQ==