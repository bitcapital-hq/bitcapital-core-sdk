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
const base_1 = require("../base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class OAuthClientWebService extends base_1.Http {
    constructor(options) {
        super(options);
        if (options.session) {
            this.interceptors(options.session.interceptors());
        }
    }
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new OAuthClientWebService(options);
        }
        return this.instance;
    }
    /**
     * Finds {#OAuthClient} with a given query
     * @param query The query of the search
     */
    find(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('/clients', query);
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((client) => new models_1.OAuthClient(client));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a {#OAuthClient} by giving it's ID
     * @param id The id of the {#OAuthClient}.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`/clients/${id}`, {});
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.OAuthClient(response.data);
        });
    }
    /**
     * Creates a new {#OAuthClient}.
     * @param client The {#OAuthClient}. properties
     */
    create(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/clients', new models_1.OAuthClient(client));
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.OAuthClient(response.data);
        });
    }
    /**
     * Updates an existing {#OAuthClient}.
     *
     * @param id the id of the {#OAuthClient}
     * @param client The values you want to update
     */
    update(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.put(`/clients/${id}`, client);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.OAuthClient(Object.assign({}, response.data));
        });
    }
    /**
     * Deletes a given {#OAuthClient}.
     * @param id The id of the client
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.delete(`/users/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.default = OAuthClientWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhDbGllbnRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoQ2xpZW50V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esa0NBQTRDO0FBQzVDLHNDQUEyRDtBQUMzRCxvQ0FBMEQ7QUFNMUQsMkJBQTJDLFNBQVEsV0FBSTtJQUlyRCxZQUFZLE9BQXFDO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQXFDO1FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRDtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ1UsSUFBSSxDQUFDLFFBQWEsRUFBRTs7WUFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0UsT0FBTyxzQkFBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNVLFFBQVEsQ0FBQyxFQUFVOztZQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV0RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxvQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVSxNQUFNLENBQUMsTUFBeUI7O1lBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksb0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsRUFBVSxFQUFFLE1BQXlCOztZQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxvQkFBVyxtQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFHLENBQUM7UUFDL0MsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ1UsVUFBVSxDQUFDLEVBQVU7O1lBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBNUZELHdDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uJztcbmltcG9ydCB7IEh0dHAsIEh0dHBPcHRpb25zIH0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgeyBPQXV0aENsaWVudCwgT0F1dGhDbGllbnRTY2hlbWEgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgUGFnaW5hdGlvblV0aWwsIFBhZ2luYXRlZEFycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoQ2xpZW50V2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBIdHRwT3B0aW9ucyB7XG4gIHNlc3Npb24/OiBTZXNzaW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aENsaWVudFdlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IE9BdXRoQ2xpZW50V2ViU2VydmljZU9wdGlvbnM7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IE9BdXRoQ2xpZW50V2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPQXV0aENsaWVudFdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xuICAgICAgdGhpcy5pbnRlcmNlcHRvcnMob3B0aW9ucy5zZXNzaW9uLmludGVyY2VwdG9ycygpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnM6IE9BdXRoQ2xpZW50V2ViU2VydmljZU9wdGlvbnMpOiBPQXV0aENsaWVudFdlYlNlcnZpY2Uge1xuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBPQXV0aENsaWVudFdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHsjT0F1dGhDbGllbnR9IHdpdGggYSBnaXZlbiBxdWVyeVxuICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IG9mIHRoZSBzZWFyY2hcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kKHF1ZXJ5OiBhbnkgPSB7fSk6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8T0F1dGhDbGllbnQ+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldCgnL2NsaWVudHMnLCBxdWVyeSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoY2xpZW50OiBhbnkpID0+IG5ldyBPQXV0aENsaWVudChjbGllbnQpKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgeyNPQXV0aENsaWVudH0gYnkgZ2l2aW5nIGl0J3MgSURcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNPQXV0aENsaWVudH0uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8T0F1dGhDbGllbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KGAvY2xpZW50cy8ke2lkfWAsIHt9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT0F1dGhDbGllbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB7I09BdXRoQ2xpZW50fS5cbiAgICogQHBhcmFtIGNsaWVudCBUaGUgeyNPQXV0aENsaWVudH0uIHByb3BlcnRpZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUoY2xpZW50OiBPQXV0aENsaWVudFNjaGVtYSk6IFByb21pc2U8T0F1dGhDbGllbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdCgnL2NsaWVudHMnLCBuZXcgT0F1dGhDbGllbnQoY2xpZW50KSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9BdXRoQ2xpZW50KHJlc3BvbnNlLmRhdGEpO1xuXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbiBleGlzdGluZyB7I09BdXRoQ2xpZW50fS5cbiAgICpcbiAgICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgeyNPQXV0aENsaWVudH1cbiAgICogQHBhcmFtIGNsaWVudCBUaGUgdmFsdWVzIHlvdSB3YW50IHRvIHVwZGF0ZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBjbGllbnQ6IE9BdXRoQ2xpZW50U2NoZW1hKTogUHJvbWlzZTxPQXV0aENsaWVudD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wdXQoYC9jbGllbnRzLyR7aWR9YCwgY2xpZW50KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT0F1dGhDbGllbnQoeyAuLi5yZXNwb25zZS5kYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBnaXZlbiB7I09BdXRoQ2xpZW50fS5cbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgY2xpZW50XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmRlbGV0ZShgL3VzZXJzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19