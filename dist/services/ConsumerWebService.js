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
const models_1 = require("../models");
const utils_1 = require("../utils");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
class ConsumerWebService extends BaseModelWebService_1.default {
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
            const result = response.data.map((item) => new models_1.User(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
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
            return new models_1.User(response.data);
        });
    }
    /**
     * Find the Documents from a User with role Consumer.
     * This method won't return pictures.
     *
     * @param id The User ID.
     */
    findDocumentsById(id = "me") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${id}/documents`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(document => new models_1.Document(document));
        });
    }
    /**
     * Find the Documents from a User with role Consumer.
     * This method will return pictures.
     *
     * @param id The User ID.
     */
    findDocumentByIdAndType(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${id}/documents/${type}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Document(response.data);
        });
    }
    /**
     * Find the Wallets from a User with role Consumer.
     *
     * @param id The User ID.
     */
    findWalletsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${id}/wallets`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(wallet => new models_1.Wallet(wallet));
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
            return new models_1.User(response.data);
        });
    }
    /**
     * Create a new Document on a User with role Consumer.
     *
     * @param id The User ID.
     */
    createDocument(id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${id}/documents`, document);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Document(response.data);
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
            const response = yield this.http.post(`/consumers/${id}`, consumer);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     * Upload a new Document picture to a User with role Consumer.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {File} picture The picture to be uploaded.
     */
    uploadDocumentPicture(id, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append("picture", picture);
            const response = yield this.http.post(`/consumers/${id}/documents/${type}/${side}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Document(response.data);
        });
    }
    /**
     * Upload a new Document picture to a User with role Consumer using base64.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     */
    uploadDocumentPictureFromBase64(id, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${id}/documents/${type}/${side}`, { picture });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Document(response.data);
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
exports.default = ConsumerWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXJXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0NvbnN1bWVyV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esc0NBQTZGO0FBQzdGLG9DQUFzRTtBQUN0RSxvRUFBNkY7QUFJN0Ysd0JBQXdDLFNBQVEsNkJBQXFDO0lBSW5GLFlBQVksT0FBa0M7UUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBa0M7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDVSxPQUFPLENBQUMsVUFBc0I7O1lBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sc0JB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QUMsY0FBYyxFQUFFLGNBQWMsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUVqRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsTUFBTSxDQUFDLEVBQVU7O1lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQTNNRCxxQ0EyTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IERvY3VtZW50LCBEb2N1bWVudFNjaGVtYSwgRG9jdW1lbnRUeXBlLCBVc2VyLCBVc2VyU2NoZW1hLCBXYWxsZXQgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvbiwgUGFnaW5hdGlvblV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN1bWVyV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8VXNlciwgVXNlclNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQ29uc3VtZXJXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbnN1bWVyV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDb25zdW1lcldlYlNlcnZpY2VPcHRpb25zKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IENvbnN1bWVyV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBVc2VycyB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2NvbnN1bWVyc1wiLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFVzZXJTY2hlbWEpID0+IG5ldyBVc2VyKGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBEb2N1bWVudHMgZnJvbSBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKiBUaGlzIG1ldGhvZCB3b24ndCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kRG9jdW1lbnRzQnlJZChpZDogc3RyaW5nID0gXCJtZVwiKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50c2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKGRvY3VtZW50ID0+IG5ldyBEb2N1bWVudChkb2N1bWVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIERvY3VtZW50cyBmcm9tIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuICBcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kRG9jdW1lbnRCeUlkQW5kVHlwZShpZDogc3RyaW5nLCB0eXBlOiBEb2N1bWVudFR5cGUpOiBQcm9taXNlPERvY3VtZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50cy8ke3R5cGV9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFdhbGxldHMgZnJvbSBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZFdhbGxldHNCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFdhbGxldFtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7aWR9L3dhbGxldHNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCh3YWxsZXQgPT4gbmV3IFdhbGxldCh3YWxsZXQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBjb25zdW1lciBUaGUgVXNlciBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGNvbnN1bWVyOiBVc2VyU2NoZW1hKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVyc2AsIGNvbnN1bWVyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgRG9jdW1lbnQgb24gYSBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNyZWF0ZURvY3VtZW50KGlkOiBzdHJpbmcsIGRvY3VtZW50OiBEb2N1bWVudFNjaGVtYSk6IFByb21pc2U8RG9jdW1lbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50c2AsIGRvY3VtZW50KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIHBhcnRpYWwgVXNlciBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGNvbnN1bWVyOiBQYXJ0aWFsPFVzZXJTY2hlbWE+KTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke2lkfWAsIGNvbnN1bWVyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZSB0byBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIFVzZXIgaWQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRUeXBlfSB0eXBlIFRoZSBEb2N1bWVudCB0eXBlLlxuICAgKiBAcGFyYW0geyhcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIpfSBzaWRlIFRoZSBEb2N1bWVudCBwaWN0dXJlIHNpZGUuXG4gICAqIEBwYXJhbSB7RmlsZX0gcGljdHVyZSBUaGUgcGljdHVyZSB0byBiZSB1cGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGxvYWREb2N1bWVudFBpY3R1cmUoaWQ6IHN0cmluZywgdHlwZTogRG9jdW1lbnRUeXBlLCBzaWRlOiBcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIsIHBpY3R1cmU6IEZpbGUpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcInBpY3R1cmVcIiwgcGljdHVyZSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZSB0byBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyIHVzaW5nIGJhc2U2NC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBVc2VyIGlkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIHsoXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiKX0gc2lkZSBUaGUgRG9jdW1lbnQgcGljdHVyZSBzaWRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGljdHVyZSBUaGUgYmFzZTY0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaWN0dXJlIHRvIGJlIHVwbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwbG9hZERvY3VtZW50UGljdHVyZUZyb21CYXNlNjQoXG4gICAgaWQ6IHN0cmluZyxcbiAgICB0eXBlOiBEb2N1bWVudFR5cGUsXG4gICAgc2lkZTogXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiLFxuICAgIHBpY3R1cmU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCB7IHBpY3R1cmUgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=