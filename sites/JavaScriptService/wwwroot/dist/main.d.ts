import { User } from 'oidc-client';
import { ApiService } from "./services/ApiService";
import { AuthService } from "./services/AuthService";
export declare class Application {
    apiService: ApiService;
    authService: AuthService;
    currentUser: User;
    errors: Array<string>;
    messages: Array<string>;
    constructor();
    init(): void;
    private addMessage;
    private clearMessages;
    private addError;
    onLogin(): void;
    onCallAPI(): void;
    onRenewToken(): void;
    onLogout(): void;
}
//# sourceMappingURL=main.d.ts.map