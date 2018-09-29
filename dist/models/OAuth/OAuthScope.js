"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scopes {
}
/**
 * The OAuth 2.0 domain scopes.
 */
Scopes.domains = {
    read: "domains:read",
    write: "domains:write",
    delete: "domains:delete",
    metrics: "domains:metrics"
};
/**
 * The OAuth 2.0 user documents scopes.
 */
Scopes.users = {
    read: "users:read",
    write: "users:write",
    delete: "users:delete"
};
/**
 * The OAuth 2.0 user documents scopes.
 */
Scopes.userDocuments = {
    read: "users:documents:read",
    write: "users:documents:write",
    delete: "users:documents:delete"
};
/**
 * The OAuth 2.0 assets scopes.
 */
Scopes.assets = {
    read: "assets:read",
    write: "assets:write",
    delete: "assets:delete",
    distribute: "assets:distribute"
};
/**
 * The OAuth 2.0 wallets scopes.
 */
Scopes.wallets = {
    read: "wallets:read",
    write: "wallets:write",
    delete: "wallets:delete"
};
/**
 * The OAuth 2.0 payments scopes.
 */
Scopes.payments = {
    read: "payments:read",
    write: "payments:write",
    delete: "payments:delete"
};
exports.default = Scopes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhTY29wZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvT0F1dGgvT0F1dGhTY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNFOztHQUVHO0FBQ2EsY0FBTyxHQUFHO0lBQ3hCLElBQUksRUFBRSxjQUFjO0lBQ3BCLEtBQUssRUFBRSxlQUFlO0lBQ3RCLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtDQUMzQixDQUFDO0FBRUY7O0dBRUc7QUFDYSxZQUFLLEdBQUc7SUFDdEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsTUFBTSxFQUFFLGNBQWM7Q0FDdkIsQ0FBQztBQUVGOztHQUVHO0FBQ2Esb0JBQWEsR0FBRztJQUM5QixJQUFJLEVBQUUsc0JBQXNCO0lBQzVCLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsTUFBTSxFQUFFLHdCQUF3QjtDQUNqQyxDQUFDO0FBRUY7O0dBRUc7QUFDYSxhQUFNLEdBQUc7SUFDdkIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsS0FBSyxFQUFFLGNBQWM7SUFDckIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsVUFBVSxFQUFFLG1CQUFtQjtDQUNoQyxDQUFDO0FBRUY7O0dBRUc7QUFDYSxjQUFPLEdBQUc7SUFDeEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsS0FBSyxFQUFFLGVBQWU7SUFDdEIsTUFBTSxFQUFFLGdCQUFnQjtDQUN6QixDQUFDO0FBRUY7O0dBRUc7QUFDYSxlQUFRLEdBQUc7SUFDekIsSUFBSSxFQUFFLGVBQWU7SUFDckIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixNQUFNLEVBQUUsaUJBQWlCO0NBQzFCLENBQUM7QUF2REoseUJBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcGVzIHtcbiAgLyoqXG4gICAqIFRoZSBPQXV0aCAyLjAgZG9tYWluIHNjb3Blcy5cbiAgICovXG4gIHN0YXRpYyByZWFkb25seSBkb21haW5zID0ge1xuICAgIHJlYWQ6IFwiZG9tYWluczpyZWFkXCIsXG4gICAgd3JpdGU6IFwiZG9tYWluczp3cml0ZVwiLFxuICAgIGRlbGV0ZTogXCJkb21haW5zOmRlbGV0ZVwiLFxuICAgIG1ldHJpY3M6IFwiZG9tYWluczptZXRyaWNzXCJcbiAgfTtcblxuICAvKipcbiAgICogVGhlIE9BdXRoIDIuMCB1c2VyIGRvY3VtZW50cyBzY29wZXMuXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgdXNlcnMgPSB7XG4gICAgcmVhZDogXCJ1c2VyczpyZWFkXCIsXG4gICAgd3JpdGU6IFwidXNlcnM6d3JpdGVcIixcbiAgICBkZWxldGU6IFwidXNlcnM6ZGVsZXRlXCJcbiAgfTtcblxuICAvKipcbiAgICogVGhlIE9BdXRoIDIuMCB1c2VyIGRvY3VtZW50cyBzY29wZXMuXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgdXNlckRvY3VtZW50cyA9IHtcbiAgICByZWFkOiBcInVzZXJzOmRvY3VtZW50czpyZWFkXCIsXG4gICAgd3JpdGU6IFwidXNlcnM6ZG9jdW1lbnRzOndyaXRlXCIsXG4gICAgZGVsZXRlOiBcInVzZXJzOmRvY3VtZW50czpkZWxldGVcIlxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgT0F1dGggMi4wIGFzc2V0cyBzY29wZXMuXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgYXNzZXRzID0ge1xuICAgIHJlYWQ6IFwiYXNzZXRzOnJlYWRcIixcbiAgICB3cml0ZTogXCJhc3NldHM6d3JpdGVcIixcbiAgICBkZWxldGU6IFwiYXNzZXRzOmRlbGV0ZVwiLFxuICAgIGRpc3RyaWJ1dGU6IFwiYXNzZXRzOmRpc3RyaWJ1dGVcIlxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgT0F1dGggMi4wIHdhbGxldHMgc2NvcGVzLlxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHdhbGxldHMgPSB7XG4gICAgcmVhZDogXCJ3YWxsZXRzOnJlYWRcIixcbiAgICB3cml0ZTogXCJ3YWxsZXRzOndyaXRlXCIsXG4gICAgZGVsZXRlOiBcIndhbGxldHM6ZGVsZXRlXCJcbiAgfTtcblxuICAvKipcbiAgICogVGhlIE9BdXRoIDIuMCBwYXltZW50cyBzY29wZXMuXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgcGF5bWVudHMgPSB7XG4gICAgcmVhZDogXCJwYXltZW50czpyZWFkXCIsXG4gICAgd3JpdGU6IFwicGF5bWVudHM6d3JpdGVcIixcbiAgICBkZWxldGU6IFwicGF5bWVudHM6ZGVsZXRlXCJcbiAgfTtcbn1cbiJdfQ==