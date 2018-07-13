import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Constants } from '../common/constants';
export class AuthService {
    public userManager: any;
    public settings: any;
    constructor() {
        const self = this;
        self.settings = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}assets/signin-callback.html`,
            silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`,
            post_logout_redirect_uri: `${Constants.clientRoot}`,
            response_type: 'id_token token',
            scope: Constants.clientScope
        }
        self.userManager = new UserManager(self.settings);
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