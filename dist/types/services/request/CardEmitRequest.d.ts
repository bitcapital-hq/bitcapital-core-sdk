export interface CardEmitRequest {
    type: "virtual" | "physical";
    plasticId?: number;
    expirationDate?: Date;
}
