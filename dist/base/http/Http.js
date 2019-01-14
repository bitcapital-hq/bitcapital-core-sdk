"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Http {
    constructor(options) {
        this.options = options;
        this.client = options.client || axios_1.default.create(options);
    }
    /**
     * Registers an array of interceptors in a single operation.
     *
     * @param interceptors The array of interceptors instances
     */
    interceptors(interceptors) {
        return interceptors.map(i => this.interceptor(i));
    }
    /**
     * Registers a single interceptor in the Http service.
     *
     * @param intercetor The interceptor instance
     */
    interceptor(intercetor) {
        // Bind interceptor methods
        this.client.interceptors.request.use(intercetor.request.bind(intercetor));
        this.client.interceptors.response.use(intercetor.response.bind(intercetor), intercetor.error.bind(intercetor));
    }
    /**
     * Performs a GET request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    get(url, data, options) {
        return this.client.get(url, Object.assign({ params: data }, options));
    }
    /**
     * Performs a POST request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    post(url, data, options) {
        return this.client.post(url, data, options);
    }
    /**
     * Performs a PUT request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object | string} [data] The query string data.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    put(url, data, options) {
        return this.client.put(url, data, options);
    }
    /**
     * Performs a DELETE request using client.
     *
     * @param {string} url The url for the request.
     * @param {Object} [options] The request options for the Axios instance.
     *
     * @returns {Promise<any>}
     */
    delete(url, options) {
        return this.client.delete(url, options);
    }
}
exports.default = Http;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9iYXNlL2h0dHAvSHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFnRjtBQVdoRjtJQUlFLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGVBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsWUFBK0I7UUFDMUMsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLFVBQTJCO1FBQ3JDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBc0IsRUFBRSxPQUE0QjtRQUNuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBRSxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQU8sQ0FBUyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxDQUFDLEdBQVcsRUFBRSxJQUFzQixFQUFFLE9BQTRCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsR0FBVyxFQUFFLElBQXNCLEVBQUUsT0FBNEI7UUFDbkUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUE0QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUEvRUQsdUJBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3NSZXNwb25zZSB9IGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9IdHRwSW50ZXJjZXB0b3JcIjtcclxuXHJcbmV4cG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9O1xyXG5leHBvcnQgdHlwZSBIdHRwQ2xpZW50ID0gQXhpb3NJbnN0YW5jZTtcclxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RPcHRpb25zID0gQXhpb3NSZXF1ZXN0Q29uZmlnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIdHRwT3B0aW9ucyBleHRlbmRzIEh0dHBSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgY2xpZW50PzogSHR0cENsaWVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHR0cCB7XHJcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IEh0dHBPcHRpb25zO1xyXG4gIHByb3RlY3RlZCBjbGllbnQ6IEh0dHBDbGllbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEh0dHBPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5jbGllbnQgPSBvcHRpb25zLmNsaWVudCB8fCBBeGlvcy5jcmVhdGUob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlcnMgYW4gYXJyYXkgb2YgaW50ZXJjZXB0b3JzIGluIGEgc2luZ2xlIG9wZXJhdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnRlcmNlcHRvcnMgVGhlIGFycmF5IG9mIGludGVyY2VwdG9ycyBpbnN0YW5jZXNcclxuICAgKi9cclxuICBpbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSkge1xyXG4gICAgcmV0dXJuIGludGVyY2VwdG9ycy5tYXAoaSA9PiB0aGlzLmludGVyY2VwdG9yKGkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyBhIHNpbmdsZSBpbnRlcmNlcHRvciBpbiB0aGUgSHR0cCBzZXJ2aWNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGludGVyY2V0b3IgVGhlIGludGVyY2VwdG9yIGluc3RhbmNlXHJcbiAgICovXHJcbiAgaW50ZXJjZXB0b3IoaW50ZXJjZXRvcjogSHR0cEludGVyY2VwdG9yKSB7XHJcbiAgICAvLyBCaW5kIGludGVyY2VwdG9yIG1ldGhvZHNcclxuICAgIHRoaXMuY2xpZW50LmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShpbnRlcmNldG9yLnJlcXVlc3QuYmluZChpbnRlcmNldG9yKSk7XHJcbiAgICB0aGlzLmNsaWVudC5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKGludGVyY2V0b3IucmVzcG9uc2UuYmluZChpbnRlcmNldG9yKSwgaW50ZXJjZXRvci5lcnJvci5iaW5kKGludGVyY2V0b3IpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGEgR0VUIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gW2RhdGFdIFRoZSBxdWVyeSBzdHJpbmcgZGF0YS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICovXHJcbiAgZ2V0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0IHwgc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0KHVybCwgeyBwYXJhbXM6IGRhdGEsIC4uLm9wdGlvbnMgfSBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgYSBQT1NUIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gW2RhdGFdIFRoZSBxdWVyeSBzdHJpbmcgZGF0YS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICovXHJcbiAgcG9zdCh1cmw6IHN0cmluZywgZGF0YT86IE9iamVjdCB8IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8QXhpb3NSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QodXJsLCBkYXRhLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGEgUFVUIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gW2RhdGFdIFRoZSBxdWVyeSBzdHJpbmcgZGF0YS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICovXHJcbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0IHwgc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucHV0KHVybCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIERFTEVURSByZXF1ZXN0IHVzaW5nIGNsaWVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgQXhpb3MgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAqL1xyXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8QXhpb3NSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmRlbGV0ZSh1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=