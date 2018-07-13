import { UserManager, User } from 'oidc-client';
export declare class AuthService {
    userManager: UserManager;
    constructor();
    getUser(): Promise<User>;
    login(): Promise<void>;
    renewToken(): Promise<User>;
    logout(): Promise<void>;
}
//# sourceMappingURL=authService.d.ts.map