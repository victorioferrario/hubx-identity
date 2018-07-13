"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var oidc_client_1 = require("oidc-client");
var constants_1 = require("../common/constants");
var AuthService = /** @class */ (function () {
    function AuthService() {
        var self = this;
        self.settings = {
            authority: constants_1.Constants.stsAuthority,
            client_id: constants_1.Constants.clientId,
            redirect_uri: constants_1.Constants.clientRoot + "assets/signin-callback.html",
            silent_redirect_uri: constants_1.Constants.clientRoot + "assets/silent-callback.html",
            post_logout_redirect_uri: "" + constants_1.Constants.clientRoot,
            response_type: 'id_token token',
            scope: constants_1.Constants.clientScope
        };
        self.userManager = new oidc_client_1.UserManager(self.settings);
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
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=app.auth.service.js.map