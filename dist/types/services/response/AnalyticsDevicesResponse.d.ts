export interface AnalyticsDevicesResponseSchema {
    browser: {
        [name: string]: number;
    };
    os: {
        [name: string]: number;
    };
}
export default class AnalyticsDevicesResponse implements AnalyticsDevicesResponseSchema {
    browser: {
        [name: string]: number;
    };
    os: {
        [name: string]: number;
    };
    constructor(data: AnalyticsDevicesResponseSchema);
}
