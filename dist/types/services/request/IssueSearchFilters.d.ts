import { IssueType, IssueCategory, SeverityLevel } from "bitcapital-common";
export interface SearchFilters {
    after?: Date;
    before?: Date;
    type?: IssueType;
    category?: IssueCategory;
    severity?: SeverityLevel;
}
