"use strict";
exports.__esModule = true;
var oidc_client_1 = require("oidc-client");
var constants_1 = require("../constants");
var AuthService = /** @class */ (function () {
    function AuthService() {
        var self = this;
        self.userManager = new oidc_client_1.UserManager({
            authority: constants_1.Constants.stsAuthority,
            client_id: constants_1.Constants.clientId,
            redirect_uri: constants_1.Constants.clientRoot + "assets/signin-callback.html",
            silent_redirect_uri: constants_1.Constants.clientRoot + "assets/silent-callback.html",
            post_logout_redirect_uri: "" + constants_1.Constants.clientRoot,
            response_type: 'id_token token',
            scope: constants_1.Constants.clientScope
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
exports.AuthService = AuthService;
// npm install --save @types/oidc-token-manager
