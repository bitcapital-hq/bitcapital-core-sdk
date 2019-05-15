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
class IssueWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new IssueWebService(options);
        return this.instance;
    }
    /**
     * Search Issues with filters.
     */
    find(pagination, filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/issues", null, { params: Object.assign({ skip, limit }, filters) });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Issue(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Issue.
     *
     * @param id The Issue ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/issues/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Issue(response.data);
        });
    }
    /**
     * Create a new Issue in the platform.
     *
     * @param asset The Issue schema.
     */
    create(issue) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/issues", issue);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Issue(response.data);
        });
    }
}
exports.IssueWebService = IssueWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXNzdWVXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0lzc3VlV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQW1HO0FBQ25HLGlDQUF5RTtBQUt6RSxNQUFhLGVBQWdCLFNBQVEsMEJBQXVDO0lBRzFFLFlBQVksT0FBK0I7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFVBQXNCLEVBQUUsVUFBeUIsRUFBRTs7WUFDbkUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxrQkFBSSxJQUFJLEVBQUUsS0FBSyxJQUFLLE9BQU8sQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUUvRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sa0NBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxNQUFNLENBQUMsS0FBa0I7O1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtDQUVGO0FBOURELDBDQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2luYXRpb24sIFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uVXRpbCwgSXNzdWUsIElzc3VlU2NoZW1hIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IFNlYXJjaEZpbHRlcnMgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXNzdWVXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBJc3N1ZVdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPElzc3VlLCBJc3N1ZVNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBJc3N1ZVdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSXNzdWVXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBJc3N1ZVdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IElzc3VlV2ViU2VydmljZU9wdGlvbnMpOiBJc3N1ZVdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgSXNzdWVXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBJc3N1ZXMgd2l0aCBmaWx0ZXJzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmQocGFnaW5hdGlvbjogUGFnaW5hdGlvbiwgZmlsdGVyczogU2VhcmNoRmlsdGVycyA9IHt9KTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxJc3N1ZT4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9pc3N1ZXNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQsIC4uLmZpbHRlcnMgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBJc3N1ZVNjaGVtYSkgPT4gbmV3IElzc3VlKGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFuIElzc3VlLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIElzc3VlIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8SXNzdWU+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9pc3N1ZXMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSXNzdWUocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IElzc3VlIGluIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIGFzc2V0IFRoZSBJc3N1ZSBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGlzc3VlOiBJc3N1ZVNjaGVtYSk6IFByb21pc2U8SXNzdWU+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL2lzc3Vlc1wiLCBpc3N1ZSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IElzc3VlKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbn1cbiJdfQ==