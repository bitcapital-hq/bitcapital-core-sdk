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
const session_1 = require("../session");
const base_1 = require("../base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class ConsumerWebService {
    constructor(options) {
        this.http = new base_1.Http(options);
        if (session_1.Session.getInstance()) {
            this.http.interceptors(session_1.Session.getInstance().interceptors());
        }
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new ConsumerWebService(options);
        return this.instance;
    }
    /**
     * Find all {#User} with role {#Consumer}s
     *
     * @param query The query of the search
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
     * Find a {#User} with role {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
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
     * Find the #{Document}s from a {#Consumer} by it's ID
     * This method won't return pictures
     *
     * @param id The id of the {#Consumer}
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
     * Find the {#Document}s from a {#Consumer} by it's ID and the {#Document} type
     * This method will return pictures
     *
     * @param id The id of the {#Consumer}
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
     * Find the {#Wallet}s from a {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
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
     *  Inserts a new {#Consumer}.
     *
     * @param consumer The values you want to insert
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
     * Create a new {#Document} on a {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
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
     * Partially update an existing {#User} with role {#Consumer}.
     *
     * @param id the id of the {#User} with role {#Consumer}
     * @param consumer The values you want to update
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
     * Upload a new {#Document} picture to a {#Consumer} by it's ID and the {#Document} type and side
     *
     * @param id The id of the {#Consumer}
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
     * Upload a new {#Document} picture to a {#Consumer} by it's ID and the {#Document} type and side from base64
     *
     * @param id The id of the {#Consumer}
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
     * Delete a {#User} with role {#Consumer} by it's id
     *
     * @param id The id of the {#User} with role {#Consumer}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXJXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0NvbnN1bWVyV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsd0NBQXFDO0FBQ3JDLGtDQUE0QztBQUM1QyxzQ0FBNkY7QUFDN0Ysb0NBQXNFO0FBR3RFO0lBSUUsWUFBWSxPQUFvQjtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksaUJBQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQW9CO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsVUFBc0I7O1lBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7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QUNyQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsK0JBQStCLENBQzFDLEVBQVUsRUFDVixJQUFrQixFQUNsQixJQUFpQyxFQUNqQyxPQUFlOztZQUVmLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWMsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUVqRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsTUFBTSxDQUFDLEVBQVU7O1lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQTNNRCxxQ0EyTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4uL3Nlc3Npb25cIjtcbmltcG9ydCB7IEh0dHAsIEh0dHBPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEsIERvY3VtZW50LCBXYWxsZXQsIERvY3VtZW50U2NoZW1hLCBEb2N1bWVudFR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBQYWdpbmF0aW9uVXRpbCwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb24gfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlIGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdW1lcldlYlNlcnZpY2UgaW1wbGVtZW50cyBCYXNlTW9kZWxXZWJTZXJ2aWNlPFVzZXIsIFVzZXJTY2hlbWE+IHtcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IENvbnN1bWVyV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBIdHRwT3B0aW9ucykge1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuXG4gICAgaWYgKFNlc3Npb24uZ2V0SW5zdGFuY2UoKSkge1xuICAgICAgdGhpcy5odHRwLmludGVyY2VwdG9ycyhTZXNzaW9uLmdldEluc3RhbmNlKCkuaW50ZXJjZXB0b3JzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBIdHRwT3B0aW9ucyk6IENvbnN1bWVyV2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25zdW1lcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgeyNVc2VyfSB3aXRoIHJvbGUgeyNDb25zdW1lcn1zXG4gICAqXG4gICAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgb2YgdGhlIHNlYXJjaFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRBbGwocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8VXNlcj4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9jb25zdW1lcnNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBVc2VyU2NoZW1hKSA9PiBuZXcgVXNlcihpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHsjVXNlcn0gd2l0aCByb2xlIHsjQ29uc3VtZXJ9IGJ5IGl0J3MgSURcbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNDb25zdW1lcn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSAje0RvY3VtZW50fXMgZnJvbSBhIHsjQ29uc3VtZXJ9IGJ5IGl0J3MgSURcbiAgICogVGhpcyBtZXRob2Qgd29uJ3QgcmV0dXJuIHBpY3R1cmVzXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjQ29uc3VtZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZERvY3VtZW50c0J5SWQoaWQ6IHN0cmluZyA9IFwibWVcIik6IFByb21pc2U8RG9jdW1lbnRbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke2lkfS9kb2N1bWVudHNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcChkb2N1bWVudCA9PiBuZXcgRG9jdW1lbnQoZG9jdW1lbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSB7I0RvY3VtZW50fXMgZnJvbSBhIHsjQ29uc3VtZXJ9IGJ5IGl0J3MgSUQgYW5kIHRoZSB7I0RvY3VtZW50fSB0eXBlXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHBpY3R1cmVzXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjQ29uc3VtZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZERvY3VtZW50QnlJZEFuZFR5cGUoaWQ6IHN0cmluZywgdHlwZTogRG9jdW1lbnRUeXBlKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke2lkfS9kb2N1bWVudHMvJHt0eXBlfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSB7I1dhbGxldH1zIGZyb20gYSB7I0NvbnN1bWVyfSBieSBpdCdzIElEXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjQ29uc3VtZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZFdhbGxldHNCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFdhbGxldFtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7aWR9L3dhbGxldHNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCh3YWxsZXQgPT4gbmV3IFdhbGxldCh3YWxsZXQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgSW5zZXJ0cyBhIG5ldyB7I0NvbnN1bWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN1bWVyIFRoZSB2YWx1ZXMgeW91IHdhbnQgdG8gaW5zZXJ0XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGNvbnN1bWVyOiBVc2VyU2NoZW1hKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVyc2AsIGNvbnN1bWVyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgeyNEb2N1bWVudH0gb24gYSB7I0NvbnN1bWVyfSBieSBpdCdzIElEXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjQ29uc3VtZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlRG9jdW1lbnQoaWQ6IHN0cmluZywgZG9jdW1lbnQ6IERvY3VtZW50U2NoZW1hKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHtpZH0vZG9jdW1lbnRzYCwgZG9jdW1lbnQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIHsjVXNlcn0gd2l0aCByb2xlIHsjQ29uc3VtZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSB7I1VzZXJ9IHdpdGggcm9sZSB7I0NvbnN1bWVyfVxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIHZhbHVlcyB5b3Ugd2FudCB0byB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgY29uc3VtZXI6IFBhcnRpYWw8VXNlclNjaGVtYT4pOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9YCwgY29uc3VtZXIpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBhIG5ldyB7I0RvY3VtZW50fSBwaWN0dXJlIHRvIGEgeyNDb25zdW1lcn0gYnkgaXQncyBJRCBhbmQgdGhlIHsjRG9jdW1lbnR9IHR5cGUgYW5kIHNpZGVcbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNDb25zdW1lcn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGxvYWREb2N1bWVudFBpY3R1cmUoaWQ6IHN0cmluZywgdHlwZTogRG9jdW1lbnRUeXBlLCBzaWRlOiBcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIsIHBpY3R1cmU6IEZpbGUpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcInBpY3R1cmVcIiwgcGljdHVyZSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgeyNEb2N1bWVudH0gcGljdHVyZSB0byBhIHsjQ29uc3VtZXJ9IGJ5IGl0J3MgSUQgYW5kIHRoZSB7I0RvY3VtZW50fSB0eXBlIGFuZCBzaWRlIGZyb20gYmFzZTY0XG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjQ29uc3VtZXJ9XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBsb2FkRG9jdW1lbnRQaWN0dXJlRnJvbUJhc2U2NChcbiAgICBpZDogc3RyaW5nLFxuICAgIHR5cGU6IERvY3VtZW50VHlwZSxcbiAgICBzaWRlOiBcImZyb250XCIgfCBcImJhY2tcIiB8IFwic2VsZmllXCIsXG4gICAgcGljdHVyZTogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHtpZH0vZG9jdW1lbnRzLyR7dHlwZX0vJHtzaWRlfWAsIHsgcGljdHVyZSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgeyNVc2VyfSB3aXRoIHJvbGUgeyNDb25zdW1lcn0gYnkgaXQncyBpZFxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSB7I1VzZXJ9IHdpdGggcm9sZSB7I0NvbnN1bWVyfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19