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
     * Find the Documents from a User with role Consumer.
     * This method won't return pictures.
     *
     * @param id The User ID.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    findDocumentsById(id = "me") {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("This method was moved to DocumentWebService and will be removed in a future release");
            const response = yield this.http.get(`/consumers/${id}/documents`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(document => new bitcapital_common_1.Document(document));
        });
    }
    /**
     * Find the Documents from a User with role Consumer.
     * This method will return pictures.
     *
     * @param id The User ID.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    findDocumentByIdAndType(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("This method was moved to DocumentWebService and will be removed in a future release");
            const response = yield this.http.get(`/consumers/${id}/documents/${type}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
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
            return response.data.map(wallet => new bitcapital_common_1.Wallet(wallet));
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
     * Create a new Document on a User with role Consumer.
     *
     * @param id The User ID.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    createDocument(id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("This method was moved to DocumentWebService and will be removed in a future release");
            const response = yield this.http.post(`/consumers/${id}/documents`, document);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
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
     * Upload a new Document picture to a User with role Consumer.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {File} picture The picture to be uploaded.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    uploadDocumentPicture(id, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("This method was moved to DocumentWebService and will be removed in a future release");
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
            return new bitcapital_common_1.Document(response.data);
        });
    }
    /**
     * Upload a new Document picture to a User with role Consumer using base64.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    uploadDocumentPictureFromBase64(id, type, side, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("This method was moved to DocumentWebService and will be removed in a future release");
            const response = yield this.http.post(`/consumers/${id}/documents/${type}/${side}`, { picture });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Document(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXJXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0NvbnN1bWVyV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBVzJCO0FBQzNCLGlDQUF5RTtBQUl6RSx3QkFBZ0MsU0FBUSwwQkFBcUM7SUFJM0UsWUFBWSxPQUFrQztRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFrQztRQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV0RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sa0NBQWMsQ0FBQyxLQUFL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QUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBdE9ELGdEQXNPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxuICBEb2N1bWVudCwgXG4gIERvY3VtZW50U2NoZW1hLCBcbiAgRG9jdW1lbnRUeXBlLCBcbiAgSHR0cCwgXG4gIFVzZXIsIFxuICBVc2VyU2NoZW1hLCBcbiAgV2FsbGV0LCBcbiAgUGFnaW5hdGlvbiwgXG4gIFBhZ2luYXRlZEFycmF5LCBcbiAgUGFnaW5hdGlvblV0aWxcbn0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25zdW1lcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIENvbnN1bWVyV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8VXNlciwgVXNlclNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQ29uc3VtZXJXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbnN1bWVyV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDb25zdW1lcldlYlNlcnZpY2VPcHRpb25zKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IENvbnN1bWVyV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBVc2VycyB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2NvbnN1bWVyc1wiLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFVzZXJTY2hlbWEpID0+IG5ldyBVc2VyKGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBEb2N1bWVudHMgZnJvbSBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKiBUaGlzIG1ldGhvZCB3b24ndCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICogQGRlcHJlY2F0ZWQgVGhpcyBtZXRob2Qgd2FzIG1vdmVkIHRvIERvY3VtZW50V2ViU2VydmljZSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kRG9jdW1lbnRzQnlJZChpZDogc3RyaW5nID0gXCJtZVwiKTogUHJvbWlzZTxEb2N1bWVudFtdPiB7XG4gICAgY29uc29sZS53YXJuKFwiVGhpcyBtZXRob2Qgd2FzIG1vdmVkIHRvIERvY3VtZW50V2ViU2VydmljZSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VcIik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH0vZG9jdW1lbnRzYCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAoZG9jdW1lbnQgPT4gbmV3IERvY3VtZW50KGRvY3VtZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgRG9jdW1lbnRzIGZyb20gYSBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcGljdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICogQGRlcHJlY2F0ZWQgVGhpcyBtZXRob2Qgd2FzIG1vdmVkIHRvIERvY3VtZW50V2ViU2VydmljZSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kRG9jdW1lbnRCeUlkQW5kVHlwZShpZDogc3RyaW5nLCB0eXBlOiBEb2N1bWVudFR5cGUpOiBQcm9taXNlPERvY3VtZW50PiB7XG4gICAgY29uc29sZS53YXJuKFwiVGhpcyBtZXRob2Qgd2FzIG1vdmVkIHRvIERvY3VtZW50V2ViU2VydmljZSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VcIik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH0vZG9jdW1lbnRzLyR7dHlwZX1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgV2FsbGV0cyBmcm9tIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kV2FsbGV0c0J5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8V2FsbGV0W10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHtpZH0vd2FsbGV0c2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHdhbGxldCA9PiBuZXcgV2FsbGV0KHdhbGxldCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN1bWVyIFRoZSBVc2VyIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUoY29uc3VtZXI6IFVzZXJTY2hlbWEpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzYCwgY29uc3VtZXIpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBEb2N1bWVudCBvbiBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIHdhcyBtb3ZlZCB0byBEb2N1bWVudFdlYlNlcnZpY2UgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlRG9jdW1lbnQoaWQ6IHN0cmluZywgZG9jdW1lbnQ6IERvY3VtZW50U2NoZW1hKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIGNvbnNvbGUud2FybihcIlRoaXMgbWV0aG9kIHdhcyBtb3ZlZCB0byBEb2N1bWVudFdlYlNlcnZpY2UgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlXCIpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke2lkfS9kb2N1bWVudHNgLCBkb2N1bWVudCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvY3VtZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICogQHBhcmFtIGNvbnN1bWVyIFRoZSBwYXJ0aWFsIFVzZXIgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBjb25zdW1lcjogUGFydGlhbDxVc2VyU2NoZW1hPik6IFByb21pc2U8VXNlcj4ge1xuICAgIGlmIChjb25zdW1lci5jb25zdW1lcikge1xuICAgICAgaWYgKGNvbnN1bWVyLmNvbnN1bWVyLmFkZHJlc3Nlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBZGRyZXNzZXMgc2hvdWxkIGJlIHVwZGF0ZWQgb24gaXQncyBvd24gc2VydmljZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdW1lci5jb25zdW1lci5kb2N1bWVudHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG9jdW1lbnRzIHNob3VsZCBiZSB1cGRhdGVkIG9uIGl0J3Mgb3duIHNlcnZpY2VcIik7XG4gICAgICB9XG4gICAgICBpZiAoY29uc3VtZXIuY29uc3VtZXIucGhvbmVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBob25lcyBzaG91bGQgYmUgdXBkYXRlZCBvbiBpdCdzIG93biBzZXJ2aWNlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHtpZH1gLCBjb25zdW1lcik7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVzZXIocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGEgbmV3IERvY3VtZW50IHBpY3R1cmUgdG8gYSBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBVc2VyIGlkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIHsoXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiKX0gc2lkZSBUaGUgRG9jdW1lbnQgcGljdHVyZSBzaWRlLlxuICAgKiBAcGFyYW0ge0ZpbGV9IHBpY3R1cmUgVGhlIHBpY3R1cmUgdG8gYmUgdXBsb2FkZWQuXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIHdhcyBtb3ZlZCB0byBEb2N1bWVudFdlYlNlcnZpY2UgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBsb2FkRG9jdW1lbnRQaWN0dXJlKGlkOiBzdHJpbmcsIHR5cGU6IERvY3VtZW50VHlwZSwgc2lkZTogXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiLCBwaWN0dXJlOiBGaWxlKSB7XG4gICAgY29uc29sZS53YXJuKFwiVGhpcyBtZXRob2Qgd2FzIG1vdmVkIHRvIERvY3VtZW50V2ViU2VydmljZSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VcIik7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcInBpY3R1cmVcIiwgcGljdHVyZSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7aWR9L2RvY3VtZW50cy8ke3R5cGV9LyR7c2lkZX1gLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBuZXcgRG9jdW1lbnQgcGljdHVyZSB0byBhIFVzZXIgd2l0aCByb2xlIENvbnN1bWVyIHVzaW5nIGJhc2U2NC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBVc2VyIGlkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50VHlwZX0gdHlwZSBUaGUgRG9jdW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIHsoXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiKX0gc2lkZSBUaGUgRG9jdW1lbnQgcGljdHVyZSBzaWRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGljdHVyZSBUaGUgYmFzZTY0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaWN0dXJlIHRvIGJlIHVwbG9hZGVkLlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIG1ldGhvZCB3YXMgbW92ZWQgdG8gRG9jdW1lbnRXZWJTZXJ2aWNlIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwbG9hZERvY3VtZW50UGljdHVyZUZyb21CYXNlNjQoXG4gICAgaWQ6IHN0cmluZyxcbiAgICB0eXBlOiBEb2N1bWVudFR5cGUsXG4gICAgc2lkZTogXCJmcm9udFwiIHwgXCJiYWNrXCIgfCBcInNlbGZpZVwiLFxuICAgIHBpY3R1cmU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zb2xlLndhcm4oXCJUaGlzIG1ldGhvZCB3YXMgbW92ZWQgdG8gRG9jdW1lbnRXZWJTZXJ2aWNlIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZVwiKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHtpZH0vZG9jdW1lbnRzLyR7dHlwZX0vJHtzaWRlfWAsIHsgcGljdHVyZSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9jdW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgVXNlciB3aXRoIHJvbGUgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmRlbGV0ZShgL2NvbnN1bWVycy8ke2lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==