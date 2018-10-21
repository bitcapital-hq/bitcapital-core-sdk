import * as CryptoJS from "crypto-js";

export interface RequestSigningHeaders {
  "X-Request-Signature": string;
  "X-Request-Timestamp": string;
}

export interface RequestSigningOptions {
  method: string;
  url: string;
  body?: string;
  timestamp?: string;
}

export default class RequestUtil {
  /**
   * Generates headers for request signing.
   */
  public static sign(secret: string, req: RequestSigningOptions): RequestSigningHeaders {
    const now = req.timestamp ? req.timestamp : Date.now();
    const payload = [req.method, req.url, now];

    // Check if should sign body as well
    if ((req.body && req.method.toUpperCase() === "POST") || req.method.toUpperCase() === "PUT") {
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
