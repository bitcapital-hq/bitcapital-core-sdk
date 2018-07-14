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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9iYXNlL2h0dHAvSHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFnRjtBQVdoRjtJQUlFLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGVBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsWUFBK0I7UUFDMUMsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLFVBQTJCO1FBQ3JDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBc0IsRUFBRSxPQUE0QjtRQUNuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBRSxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQU8sQ0FBUyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxDQUFDLEdBQVcsRUFBRSxJQUFzQixFQUFFLE9BQTRCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsR0FBVyxFQUFFLElBQXNCLEVBQUUsT0FBNEI7UUFDbkUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUE0QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUEvRUQsdUJBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vSHR0cEludGVyY2VwdG9yJztcblxuZXhwb3J0IHsgSHR0cEludGVyY2VwdG9yIH07XG5leHBvcnQgdHlwZSBIdHRwQ2xpZW50ID0gQXhpb3NJbnN0YW5jZTtcbmV4cG9ydCB0eXBlIEh0dHBSZXF1ZXN0T3B0aW9ucyA9IEF4aW9zUmVxdWVzdENvbmZpZztcblxuZXhwb3J0IGludGVyZmFjZSBIdHRwT3B0aW9ucyBleHRlbmRzIEh0dHBSZXF1ZXN0T3B0aW9ucyB7XG4gIGNsaWVudD86IEh0dHBDbGllbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0dHAge1xuICBwcm90ZWN0ZWQgb3B0aW9uczogSHR0cE9wdGlvbnM7XG4gIHByb3RlY3RlZCBjbGllbnQ6IEh0dHBDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSHR0cE9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2xpZW50ID0gb3B0aW9ucy5jbGllbnQgfHwgQXhpb3MuY3JlYXRlKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBhcnJheSBvZiBpbnRlcmNlcHRvcnMgaW4gYSBzaW5nbGUgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gaW50ZXJjZXB0b3JzIFRoZSBhcnJheSBvZiBpbnRlcmNlcHRvcnMgaW5zdGFuY2VzXG4gICAqL1xuICBpbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSkge1xuICAgIHJldHVybiBpbnRlcmNlcHRvcnMubWFwKGkgPT4gdGhpcy5pbnRlcmNlcHRvcihpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgc2luZ2xlIGludGVyY2VwdG9yIGluIHRoZSBIdHRwIHNlcnZpY2UuXG4gICAqXG4gICAqIEBwYXJhbSBpbnRlcmNldG9yIFRoZSBpbnRlcmNlcHRvciBpbnN0YW5jZVxuICAgKi9cbiAgaW50ZXJjZXB0b3IoaW50ZXJjZXRvcjogSHR0cEludGVyY2VwdG9yKSB7XG4gICAgLy8gQmluZCBpbnRlcmNlcHRvciBtZXRob2RzXG4gICAgdGhpcy5jbGllbnQuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGludGVyY2V0b3IucmVxdWVzdC5iaW5kKGludGVyY2V0b3IpKTtcbiAgICB0aGlzLmNsaWVudC5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKGludGVyY2V0b3IucmVzcG9uc2UuYmluZChpbnRlcmNldG9yKSwgaW50ZXJjZXRvci5lcnJvci5iaW5kKGludGVyY2V0b3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIEdFVCByZXF1ZXN0IHVzaW5nIGNsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IFtkYXRhXSBUaGUgcXVlcnkgc3RyaW5nIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIHJlcXVlc3Qgb3B0aW9ucyBmb3IgdGhlIEF4aW9zIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgZ2V0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0IHwgc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldCh1cmwsIHsgcGFyYW1zOiBkYXRhLCAuLi5vcHRpb25zIH0gYXMgYW55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIFBPU1QgcmVxdWVzdCB1c2luZyBjbGllbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSBbZGF0YV0gVGhlIHF1ZXJ5IHN0cmluZyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHBvc3QodXJsOiBzdHJpbmcsIGRhdGE/OiBPYmplY3QgfCBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdCh1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgUFVUIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgZm9yIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gW2RhdGFdIFRoZSBxdWVyeSBzdHJpbmcgZGF0YS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgQXhpb3MgaW5zdGFuY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdXQodXJsOiBzdHJpbmcsIGRhdGE/OiBPYmplY3QgfCBzdHJpbmcsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucHV0KHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBERUxFVEUgcmVxdWVzdCB1c2luZyBjbGllbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIHJlcXVlc3Qgb3B0aW9ucyBmb3IgdGhlIEF4aW9zIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmRlbGV0ZSh1cmwsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=