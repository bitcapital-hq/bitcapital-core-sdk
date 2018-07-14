export declare const DEFAULT_LIMIT = 25;
/**
 * Utility for handling simple pagination options.
 */
export default interface Pagination {
    /**
     * The count of items to skip in the start of the results.
     */
    skip?: number;
    /**
     * The count of items in each page of the results.
     */
    limit?: number;
}
/**
 * Pagination data for extending the Array.
 */
export interface PaginationData {
    dataLength?: number;
    dataLimit?: number;
    dataSkip?: number;
}
/**
 * The extended Array with the pagination data.
 */
export declare class PaginatedArray<T> extends Array<T> implements PaginationData {
    dataLength?: number;
    dataLimit?: number;
    dataSkip?: number;
}
export declare class PaginationUtil {
    /**
     * Merge the response data with pagination headers.
     *
     * @param data The input array data
     * @param headers The map of the response headers
     */
    static parse<T>(data?: PaginatedArray<T>, headers?: any): PaginatedArray<T>;
}
