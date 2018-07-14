export interface AnalyticsActiveResponseSchema {
    users: number;
    clients: {
        id: string;
        clientId: string;
        platform: string;
        tokens: string;
    }[];
}
export default class AnalyticsActiveResponse implements AnalyticsActiveResponseSchema {
    users: number;
    clients: {
        id: string;
        clientId: string;
        platform: string;
        tokens: string;
    }[];
    constructor(data: AnalyticsActiveResponseSchema);
}
