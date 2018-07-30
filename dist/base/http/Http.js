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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9iYXNlL2h0dHAvSHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFnRjtBQVdoRjtJQUlFLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGVBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsWUFBK0I7UUFDMUMsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLFVBQTJCO1FBQ3JDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBc0IsRUFBRSxPQUE0QjtRQUNuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBRSxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQU8sQ0FBUyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxDQUFDLEdBQVcsRUFBRSxJQUFzQixFQUFFLE9BQTRCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsR0FBVyxFQUFFLElBQXNCLEVBQUUsT0FBNEI7UUFDbkUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUE0QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUEvRUQsdUJBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3NSZXNwb25zZSB9IGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSBcIi4vSHR0cEludGVyY2VwdG9yXCI7XG5cbmV4cG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9O1xuZXhwb3J0IHR5cGUgSHR0cENsaWVudCA9IEF4aW9zSW5zdGFuY2U7XG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdE9wdGlvbnMgPSBBeGlvc1JlcXVlc3RDb25maWc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cE9wdGlvbnMgZXh0ZW5kcyBIdHRwUmVxdWVzdE9wdGlvbnMge1xuICBjbGllbnQ/OiBIdHRwQ2xpZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwIHtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IEh0dHBPcHRpb25zO1xuICBwcm90ZWN0ZWQgY2xpZW50OiBIdHRwQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEh0dHBPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNsaWVudCA9IG9wdGlvbnMuY2xpZW50IHx8IEF4aW9zLmNyZWF0ZShvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gYXJyYXkgb2YgaW50ZXJjZXB0b3JzIGluIGEgc2luZ2xlIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGludGVyY2VwdG9ycyBUaGUgYXJyYXkgb2YgaW50ZXJjZXB0b3JzIGluc3RhbmNlc1xuICAgKi9cbiAgaW50ZXJjZXB0b3JzKGludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10pIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0b3JzLm1hcChpID0+IHRoaXMuaW50ZXJjZXB0b3IoaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIHNpbmdsZSBpbnRlcmNlcHRvciBpbiB0aGUgSHR0cCBzZXJ2aWNlLlxuICAgKlxuICAgKiBAcGFyYW0gaW50ZXJjZXRvciBUaGUgaW50ZXJjZXB0b3IgaW5zdGFuY2VcbiAgICovXG4gIGludGVyY2VwdG9yKGludGVyY2V0b3I6IEh0dHBJbnRlcmNlcHRvcikge1xuICAgIC8vIEJpbmQgaW50ZXJjZXB0b3IgbWV0aG9kc1xuICAgIHRoaXMuY2xpZW50LmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShpbnRlcmNldG9yLnJlcXVlc3QuYmluZChpbnRlcmNldG9yKSk7XG4gICAgdGhpcy5jbGllbnQuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShpbnRlcmNldG9yLnJlc3BvbnNlLmJpbmQoaW50ZXJjZXRvciksIGludGVyY2V0b3IuZXJyb3IuYmluZChpbnRlcmNldG9yKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBHRVQgcmVxdWVzdCB1c2luZyBjbGllbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSBbZGF0YV0gVGhlIHF1ZXJ5IHN0cmluZyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIGdldCh1cmw6IHN0cmluZywgZGF0YT86IE9iamVjdCB8IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8QXhpb3NSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5nZXQodXJsLCB7IHBhcmFtczogZGF0YSwgLi4ub3B0aW9ucyB9IGFzIGFueSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBQT1NUIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgZm9yIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gW2RhdGFdIFRoZSBxdWVyeSBzdHJpbmcgZGF0YS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgQXhpb3MgaW5zdGFuY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwb3N0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0IHwgc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QodXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIFBVVCByZXF1ZXN0IHVzaW5nIGNsaWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IFtkYXRhXSBUaGUgcXVlcnkgc3RyaW5nIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIHJlcXVlc3Qgb3B0aW9ucyBmb3IgdGhlIEF4aW9zIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0IHwgc3RyaW5nLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LnB1dCh1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgREVMRVRFIHJlcXVlc3QgdXNpbmcgY2xpZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgZm9yIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBBeGlvcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8QXhpb3NSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5kZWxldGUodXJsLCBvcHRpb25zKTtcbiAgfVxufVxuIl19