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
const base_1 = require("./base");
const bitcapital_common_1 = require("bitcapital-common");
class DocumentWebService extends base_1.NestedModelWebService {
    constructor(options) {
        super(options);
        this.options = options;
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new DocumentWebService(options);
        return this.instance;
    }
    /**
     * Find all Documents from a Consumer.
     * This method won't return pictures.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/consumers/${userId}/documents`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Document(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Document based on it's ID or type.
     * This method will return pictures.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID or type.
     */
    findOne(userId, documentIdOrType) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${userId}/documents/${documentIdOrType}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Create a new Document in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param document The Document schema.
     */
    create(userId, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/documents`, document);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Partially update an existing Document.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID.
     * @param document The partial Document schema.
     */
    update(userId, documentId, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/documents/${documentId}`, document);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Upload a new Document picture.
     *
     * @param {string} userId The Consumer's User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {File} picture The picture to be uploaded.
     */
    uploadPicture(userId, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append("picture", picture);
            const response = yield this.http.post(`/consumers/${userId}/documents/${type}/${side}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Upload a new Document picture.
     *
     * @param {string} userId The Consumer's User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     */
    uploadPictureFromBase64(userId, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/documents/${type}/${side}`, { picture });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Delete an Document from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID.
     */
    delete(userId, documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumers/${userId}/documents/${documentId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.DocumentWebService = DocumentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0RvY3VtZW50V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHlEQUF5RztBQUl6Ryx3QkFBZ0MsU0FBUSw0QkFBK0M7SUFHckYsWUFBK0IsT0FBa0M7UUFDL0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRGMsWUFBTyxHQUFQLE9BQU8sQ0FBMkI7SUFFakUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFrQztRQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVSxPQUFPLENBQUMsTUFBYyxFQUFFLFVBQXNCOztZQUN6RCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsTUFBTSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLElBQUksNEJBQVEs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LENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLFVBQWtCOztZQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsTUFBTSxjQUFjLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFFeEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBckpELGdEQXFKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lc3RlZE1vZGVsV2ViU2VydmljZSwgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IERvY3VtZW50LCBEb2N1bWVudFNjaGVtYSwgUGFnaW5hdGlvbiwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5lc3RlZE1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIERvY3VtZW50V2ViU2VydmljZSBleHRlbmRzIE5lc3RlZE1vZGVsV2ViU2VydmljZTxEb2N1bWVudCwgRG9jdW1lbnRTY2hlbWE+IHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogRG9jdW1lbnRXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBEb2N1bWVudFdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IERvY3VtZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogRG9jdW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyk6IERvY3VtZW50V2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBEb2N1bWVudFdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgRG9jdW1lbnRzIGZyb20gYSBDb25zdW1lci5cbiAgICogVGhpcyBtZXRob2Qgd29uJ3QgcmV0dXJuIHBpY3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBwYWdpbmF0aW9uIFRoZSBwYWdpbmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbCh1c2VySWQ6IHN0cmluZywgcGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8RG9jdW1lbnQ+PiB7XG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50c2AsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogRG9jdW1lbnRTY2hlbWEpID0+IG5ldyBEb2N1bWVudChpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbiBEb2N1bWVudCBiYXNlZCBvbiBpdCdzIElEIG9yIHR5cGUuXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHBpY3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBkb2N1bWVudElkIFRoZSBEb2N1bWVudCBJRCBvciB0eXBlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUodXNlcklkOiBzdHJpbmcsIGRvY3VtZW50SWRPclR5cGU6IHN0cmluZyk6IFByb21pc2U8RG9jdW1lbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50cy8ke2RvY3VtZW50SWRPclR5cGV9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBEb2N1bWVudCBpbiB0aGUgcGxhdGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGRvY3VtZW50IFRoZSBEb2N1bWVudCBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBkb2N1bWVudDogRG9jdW1lbnRTY2hlbWEpOiBQcm9taXNlPERvY3VtZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzYCwgZG9jdW1lbnQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIERvY3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBkb2N1bWVudElkIFRoZSBEb2N1bWVudCBJRC5cbiAgICogQHBhcmFtIGRvY3VtZW50IFRoZSBwYXJ0aWFsIERvY3VtZW50IHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlcklkOiBzdHJpbmcsIGRvY3VtZW50SWQ6IHN0cmluZywgZG9jdW1lbnQ6IFBhcnRpYWw8RG9jdW1lbnRTY2hlbWE+KTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50cy8ke2RvY3VtZW50SWR9YCwgZG9jdW1lbnQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIGlkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIHsoXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiKX0gc2lkZSBUaGUgRG9jdW1lbnQgcGljdHVyZSBzaWRlLlxuICAgKiBAcGFyYW0ge0ZpbGV9IHBpY3R1cmUgVGhlIHBpY3R1cmUgdG8gYmUgdXBsb2FkZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBsb2FkUGljdHVyZSh1c2VySWQ6IHN0cmluZywgdHlwZTogRG9jdW1lbnRUeXBlLCBzaWRlOiBcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIsIHBpY3R1cmU6IEZpbGUpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcInBpY3R1cmVcIiwgcGljdHVyZSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHt0eXBlfS8ke3NpZGV9YCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGEgbmV3IERvY3VtZW50IHBpY3R1cmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBpZC5cbiAgICogQHBhcmFtIHtEb2N1bWVudFR5cGV9IHR5cGUgVGhlIERvY3VtZW50IHR5cGUuXG4gICAqIEBwYXJhbSB7KFwiZnJvbnRcIiB8IFwiYmFja1wiIHwgXCJzZWxmaWVcIil9IHNpZGUgVGhlIERvY3VtZW50IHBpY3R1cmUgc2lkZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBpY3R1cmUgVGhlIGJhc2U2NCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGljdHVyZSB0byBiZSB1cGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGxvYWRQaWN0dXJlRnJvbUJhc2U2NChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICB0eXBlOiBEb2N1bWVudFR5cGUsXG4gICAgc2lkZTogXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiLFxuICAgIHBpY3R1cmU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHt0eXBlfS8ke3NpZGV9YCwgeyBwaWN0dXJlIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gRG9jdW1lbnQgZnJvbSB0aGUgcGxhdGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGRvY3VtZW50SWQgVGhlIERvY3VtZW50IElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHtkb2N1bWVudElkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==