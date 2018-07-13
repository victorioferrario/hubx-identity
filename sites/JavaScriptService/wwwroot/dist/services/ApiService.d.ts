/// <reference types="jquery" />
import { AuthService } from "./AuthService";
export declare class ApiService {
    authService: AuthService;
    constructor(authService: AuthService);
    HttpApi(): Promise<any>;
    callApi(token: string): JQueryPromise<any>;
}
//# sourceMappingURL=ApiService.d.ts.map