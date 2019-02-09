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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0RvY3VtZW50V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHlEQUF5RztBQUl6RyxNQUFhLGtCQUFtQixTQUFRLDRCQUErQztJQUdyRixZQUErQixPQUFrQztRQUMvRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEYyxZQUFPLEdBQVAsT0FBTyxDQUEyQjtJQUVqRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWtDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNVLE9BQU8sQ0FBQyxNQUFjLEVBQUUsVUFBc0I7O1lBQ3pELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxNQUFNLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTFHLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBb0IsRUFBRSxFQUFFLENBQUMsSUFBSSw0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LENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsVUFBa0I7O1lBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxNQUFNLGNBQWMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUFySkQsZ0RBcUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlLCBOZXN0ZWRNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBEb2N1bWVudCwgRG9jdW1lbnRTY2hlbWEsIFBhZ2luYXRpb24sIFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uVXRpbCB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50V2ViU2VydmljZSBleHRlbmRzIE5lc3RlZE1vZGVsV2ViU2VydmljZTxEb2N1bWVudCwgRG9jdW1lbnRTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBEb2N1bWVudFdlYlNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBEb2N1bWVudFdlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IERvY3VtZW50V2ViU2VydmljZU9wdGlvbnMpOiBEb2N1bWVudFdlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBEb2N1bWVudFdlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYWxsIERvY3VtZW50cyBmcm9tIGEgQ29uc3VtZXIuXHJcbiAgICogVGhpcyBtZXRob2Qgd29uJ3QgcmV0dXJuIHBpY3R1cmVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBwYWdpbmF0aW9uIFRoZSBwYWdpbmF0aW9uIHBhcmFtZXRlcnMuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRBbGwodXNlcklkOiBzdHJpbmcsIHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PERvY3VtZW50Pj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzYCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xyXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IERvY3VtZW50U2NoZW1hKSA9PiBuZXcgRG9jdW1lbnQoaXRlbSkpO1xyXG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFuIERvY3VtZW50IGJhc2VkIG9uIGl0J3MgSUQgb3IgdHlwZS5cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBwaWN0dXJlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gZG9jdW1lbnRJZCBUaGUgRG9jdW1lbnQgSUQgb3IgdHlwZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRJZE9yVHlwZTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHtkb2N1bWVudElkT3JUeXBlfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBEb2N1bWVudCBpbiB0aGUgcGxhdGZvcm0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIGRvY3VtZW50IFRoZSBEb2N1bWVudCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnQ6IERvY3VtZW50U2NoZW1hKTogUHJvbWlzZTxEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzYCwgZG9jdW1lbnQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgRG9jdW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIGRvY3VtZW50SWQgVGhlIERvY3VtZW50IElELlxyXG4gICAqIEBwYXJhbSBkb2N1bWVudCBUaGUgcGFydGlhbCBEb2N1bWVudCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRJZDogc3RyaW5nLCBkb2N1bWVudDogUGFydGlhbDxEb2N1bWVudFNjaGVtYT4pOiBQcm9taXNlPERvY3VtZW50PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHtkb2N1bWVudElkfWAsIGRvY3VtZW50KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBpZC5cclxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0geyhcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIpfSBzaWRlIFRoZSBEb2N1bWVudCBwaWN0dXJlIHNpZGUuXHJcbiAgICogQHBhcmFtIHtGaWxlfSBwaWN0dXJlIFRoZSBwaWN0dXJlIHRvIGJlIHVwbG9hZGVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyB1cGxvYWRQaWN0dXJlKHVzZXJJZDogc3RyaW5nLCB0eXBlOiBEb2N1bWVudFR5cGUsIHNpZGU6IFwiZnJvbnRcIiB8IFwiYmFja1wiIHwgXCJzZWxmaWVcIiwgcGljdHVyZTogRmlsZSkge1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcInBpY3R1cmVcIiwgcGljdHVyZSk7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzLyR7dHlwZX0vJHtzaWRlfWAsIGZvcm1EYXRhLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBpZC5cclxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0geyhcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIpfSBzaWRlIFRoZSBEb2N1bWVudCBwaWN0dXJlIHNpZGUuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBpY3R1cmUgVGhlIGJhc2U2NCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGljdHVyZSB0byBiZSB1cGxvYWRlZC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgdXBsb2FkUGljdHVyZUZyb21CYXNlNjQoXHJcbiAgICB1c2VySWQ6IHN0cmluZyxcclxuICAgIHR5cGU6IERvY3VtZW50VHlwZSxcclxuICAgIHNpZGU6IFwiZnJvbnRcIiB8IFwiYmFja1wiIHwgXCJzZWxmaWVcIixcclxuICAgIHBpY3R1cmU6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzLyR7dHlwZX0vJHtzaWRlfWAsIHsgcGljdHVyZSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gRG9jdW1lbnQgZnJvbSB0aGUgcGxhdGZvcm0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIGRvY3VtZW50SWQgVGhlIERvY3VtZW50IElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUodXNlcklkOiBzdHJpbmcsIGRvY3VtZW50SWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHMvJHtkb2N1bWVudElkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==