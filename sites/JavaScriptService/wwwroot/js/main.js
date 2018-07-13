"use strict";
exports.__esModule = true;
var ApiService_1 = require("./services/ApiService");
var AuthService_1 = require("./services/AuthService");
var Application = /** @class */ (function () {
    function Application() {
        var self = this;
        self.authService = new AuthService_1.AuthService();
        self.apiService = new ApiService_1.ApiService(self.authService);
        self.init();
    }
    Application.prototype.init = function () {
        var self = this;
        self.messages = [];
        self.authService.getUser().then(function (user) {
            self.currentUser = user;
            if (user) {
                self.addMessage("User Logged In");
            }
            else {
                self.addMessage("User Not Logged In");
            }
        })["catch"](function (err) { return self.addError(err); });
    };
    Application.prototype.addMessage = function (value) {
        var self = this;
        self.messages.push(value);
    };
    Application.prototype.clearMessages = function () {
        var self = this;
        while (self.messages.length) {
            self.messages.pop();
        }
    };
    Application.prototype.addError = function (value) {
        var self = this;
        self.errors.push(value);
    };
    Application.prototype.onLogin = function () {
        var _this = this;
        this.clearMessages();
        this.authService.login()["catch"](function (err) {
            _this.addError(err);
        });
    };
    Application.prototype.onCallAPI = function () {
        var _this = this;
        this.clearMessages();
        this.apiService.callApi(this.currentUser.id_token).then(function (result) {
            _this.addMessage("API Result: " + JSON.stringify(result));
        }, function (err) { return _this.addError(err); });
    };
    Application.prototype.onRenewToken = function () {
        var _this = this;
        this.clearMessages();
        this.authService.renewToken()
            .then(function (user) {
            _this.currentUser = user;
            _this.addMessage("Silent Renew Success");
        })["catch"](function (err) { return _this.addError(err); });
    };
    Application.prototype.onLogout = function () {
        var _this = this;
        this.clearMessages();
        this.authService.logout()["catch"](function (err) { return _this.addError(err); });
    };
    return Application;
}());
exports.Application = Application;
