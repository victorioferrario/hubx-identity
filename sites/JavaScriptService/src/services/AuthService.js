import { UserManager } from 'oidc-client';
import { Constants } from '../constants';
var AuthService = /** @class */ (function () {
    function AuthService() {
        var self = this;
        self.userManager = new UserManager({
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: Constants.clientRoot + "assets/signin-callback.html",
            silent_redirect_uri: Constants.clientRoot + "assets/silent-callback.html",
            post_logout_redirect_uri: "" + Constants.clientRoot,
            response_type: 'id_token token',
            scope: Constants.clientScope
        });
    }
    AuthService.prototype.getUser = function () {
        var self = this;
        return self.userManager.getUser();
    };
    AuthService.prototype.login = function () {
        var self = this;
        return self.userManager.signinRedirect();
    };
    AuthService.prototype.renewToken = function () {
        var self = this;
        return self.userManager.signinSilent();
    };
    AuthService.prototype.logout = function () {
        var self = this;
        return self.userManager.signoutRedirect();
    };
    return AuthService;
}());
export { AuthService };
// npm install --save @types/oidc-token-manager
//# sourceMappingURL=AuthService.js.map