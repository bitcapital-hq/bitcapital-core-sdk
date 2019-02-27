"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcapital_common_1 = require("bitcapital-common");
const base_1 = require("./base");
class ConsumerWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new ConsumerWebService(options);
        return this.instance;
    }
    /**
     * Find all Users with role Consumer.
     */
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/consumers", null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.User(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a User with role Consumer.
     *
     * @param id The User ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Block an User with role Consumer.
     *
     * @param id The User ID.
     */
    block(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${id}/block`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data;
        });
    }
    /**
     * Block an User with role Consumer.
     *
     * @param id The User ID.
     */
    unblock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${id}/unblock`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data;
        });
    }
    /**
     * Create a new User with role Consumer.
     *
     * @param consumer The User schema.
     */
    create(consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers`, consumer);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Partially update an existing User with role Consumer.
     *
     * @param id The User ID.
     * @param consumer The partial User schema.
     */
    update(id, consumer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (consumer.consumer) {
                if (consumer.consumer.addresses) {
                    throw new Error("Addresses should be updated on it's own service");
                }
                if (consumer.consumer.documents) {
                    throw new Error("Documents should be updated on it's own service");
                }
                if (consumer.consumer.phones) {
                    throw new Error("Phones should be updated on it's own service");
                }
            }
            const response = yield this.http.post(`/consumers/${id}`, consumer);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Delete a User with role Consumer.
     *
     * @param id The User ID.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumers/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.ConsumerWebService = ConsumerWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXJXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0NvbnN1bWVyV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBTTJDO0FBQzNDLGlDQUF5RTtBQUl6RSxNQUFhLGtCQUFtQixTQUFRLDBCQUFxQztJQUkzRSxZQUFZLE9BQWtDO1FBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWtDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSx3QkFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkUsT0FBTyxrQ0FBYyxDQUFD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WUFFNUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBdklELGdEQXVJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEh0dHAsXG4gIFVzZXIsXG4gIFVzZXJTY2hlbWEsXG4gIFBhZ2luYXRpb24sXG4gIFBhZ2luYXRlZEFycmF5LFxuICBQYWdpbmF0aW9uVXRpbH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25zdW1lcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIENvbnN1bWVyV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8VXNlciwgVXNlclNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQ29uc3VtZXJXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbnN1bWVyV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDb25zdW1lcldlYlNlcnZpY2VPcHRpb25zKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IENvbnN1bWVyV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBVc2VycyB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2NvbnN1bWVyc1wiLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFVzZXJTY2hlbWEpID0+IG5ldyBVc2VyKGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbG9jayBhbiBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJsb2NrKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2Jsb2NrYCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbG9jayBhbiBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVuYmxvY2soaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHtpZH0vdW5ibG9ja2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIFVzZXIgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNyZWF0ZShjb25zdW1lcjogVXNlclNjaGVtYSk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnNgLCBjb25zdW1lcik7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVzZXIocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIHBhcnRpYWwgVXNlciBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGNvbnN1bWVyOiBQYXJ0aWFsPFVzZXJTY2hlbWE+KTogUHJvbWlzZTxVc2VyPiB7XG4gICAgaWYgKGNvbnN1bWVyLmNvbnN1bWVyKSB7XG4gICAgICBpZiAoY29uc3VtZXIuY29uc3VtZXIuYWRkcmVzc2VzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFkZHJlc3NlcyBzaG91bGQgYmUgdXBkYXRlZCBvbiBpdCdzIG93biBzZXJ2aWNlXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVyLmNvbnN1bWVyLmRvY3VtZW50cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEb2N1bWVudHMgc2hvdWxkIGJlIHVwZGF0ZWQgb24gaXQncyBvd24gc2VydmljZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdW1lci5jb25zdW1lci5waG9uZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGhvbmVzIHNob3VsZCBiZSB1cGRhdGVkIG9uIGl0J3Mgb3duIHNlcnZpY2VcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke2lkfWAsIGNvbnN1bWVyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19