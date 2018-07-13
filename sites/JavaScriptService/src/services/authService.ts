
import { OidcClient, UserManager, UserManagerSettings, User } from 'oidc-client';
import { Constants } from '../constants';

export class AuthService {
    public userManager: UserManager;
    constructor() {
        const self = this;
        self.userManager = new UserManager({
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}assets/signin-callback.html`,
            silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`,
            post_logout_redirect_uri: `${Constants.clientRoot}`,
            response_type: 'id_token token',
            scope: Constants.clientScope
        });
    }
    public getUser(): Promise<User> {
        const self = this;
        return self.userManager.getUser();
    }
    public login(): Promise<void> {
        const self = this;
        return self.userManager.signinRedirect();
    }
    public renewToken(): Promise<User> {
        const self = this;
        return self.userManager.signinSilent();
    }
    public logout(): Promise<void> {
        const self = this;
        return self.userManager.signoutRedirect();
    }
}

// npm install --save @types/oidc-token-manager

