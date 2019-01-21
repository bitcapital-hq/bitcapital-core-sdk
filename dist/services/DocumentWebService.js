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
const models_1 = require("../models");
const utils_1 = require("../utils");
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
            const result = response.data.map((item) => new models_1.Document(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
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
            return new models_1.Document(response.data);
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
            return new models_1.Document(response.data);
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
            return new models_1.Document(response.data);
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
            return new models_1.Document(response.data);
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
            return new models_1.Document(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0RvY3VtZW50V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHNDQUFxRDtBQUNyRCxvQ0FBc0U7QUFJdEUsd0JBQWdDLFNBQVEsNEJBQStDO0lBR3JGLFlBQStCLE9BQWtDO1FBQy9ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQTJCO0lBRWpFLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBa0M7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDekQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLE1BQU0sWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFMUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFvQixFQUFFLEVBQUUsQ0FB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QUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxVQUFrQjs7WUFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLE1BQU0sY0FBYyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBRXhGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQXJKRCxnREFxSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2UsIE5lc3RlZE1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBEb2N1bWVudFNjaGVtYSwgRG9jdW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBQYWdpbmF0aW9uLCBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvblV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRXZWJTZXJ2aWNlIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlPERvY3VtZW50LCBEb2N1bWVudFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBEb2N1bWVudFdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IERvY3VtZW50V2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBEb2N1bWVudFdlYlNlcnZpY2VPcHRpb25zKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IERvY3VtZW50V2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBEb2N1bWVudHMgZnJvbSBhIENvbnN1bWVyLlxuICAgKiBUaGlzIG1ldGhvZCB3b24ndCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIHBhZ2luYXRpb24gVGhlIHBhZ2luYXRpb24gcGFyYW1ldGVycy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxEb2N1bWVudD4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzYCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBEb2N1bWVudFNjaGVtYSkgPT4gbmV3IERvY3VtZW50KGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFuIERvY3VtZW50IGJhc2VkIG9uIGl0J3MgSUQgb3IgdHlwZS5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGRvY3VtZW50SWQgVGhlIERvY3VtZW50IElEIG9yIHR5cGUuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRJZE9yVHlwZTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzLyR7ZG9jdW1lbnRJZE9yVHlwZX1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IERvY3VtZW50IGluIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gZG9jdW1lbnQgVGhlIERvY3VtZW50IHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcklkOiBzdHJpbmcsIGRvY3VtZW50OiBEb2N1bWVudFNjaGVtYSk6IFByb21pc2U8RG9jdW1lbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9kb2N1bWVudHNgLCBkb2N1bWVudCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgRG9jdW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGRvY3VtZW50SWQgVGhlIERvY3VtZW50IElELlxuICAgKiBAcGFyYW0gZG9jdW1lbnQgVGhlIHBhcnRpYWwgRG9jdW1lbnQgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRJZDogc3RyaW5nLCBkb2N1bWVudDogUGFydGlhbDxEb2N1bWVudFNjaGVtYT4pOiBQcm9taXNlPERvY3VtZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vZG9jdW1lbnRzLyR7ZG9jdW1lbnRJZH1gLCBkb2N1bWVudCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBhIG5ldyBEb2N1bWVudCBwaWN0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgaWQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRUeXBlfSB0eXBlIFRoZSBEb2N1bWVudCB0eXBlLlxuICAgKiBAcGFyYW0geyhcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIpfSBzaWRlIFRoZSBEb2N1bWVudCBwaWN0dXJlIHNpZGUuXG4gICAqIEBwYXJhbSB7RmlsZX0gcGljdHVyZSBUaGUgcGljdHVyZSB0byBiZSB1cGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGxvYWRQaWN0dXJlKHVzZXJJZDogc3RyaW5nLCB0eXBlOiBEb2N1bWVudFR5cGUsIHNpZGU6IFwiZnJvbnRcIiB8IFwiYmFja1wiIHwgXCJzZWxmaWVcIiwgcGljdHVyZTogRmlsZSkge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKFwicGljdHVyZVwiLCBwaWN0dXJlKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIGlkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIHsoXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiKX0gc2lkZSBUaGUgRG9jdW1lbnQgcGljdHVyZSBzaWRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGljdHVyZSBUaGUgYmFzZTY0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaWN0dXJlIHRvIGJlIHVwbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwbG9hZFBpY3R1cmVGcm9tQmFzZTY0KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHR5cGU6IERvY3VtZW50VHlwZSxcbiAgICBzaWRlOiBcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIsXG4gICAgcGljdHVyZTogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCB7IHBpY3R1cmUgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBEb2N1bWVudCBmcm9tIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gZG9jdW1lbnRJZCBUaGUgRG9jdW1lbnQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKHVzZXJJZDogc3RyaW5nLCBkb2N1bWVudElkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lcnMvJHt1c2VySWR9L2RvY3VtZW50cy8ke2RvY3VtZW50SWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19