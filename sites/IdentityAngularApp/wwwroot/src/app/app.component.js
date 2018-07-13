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
var app_api_service_1 = require("./services/app.api.service");
var app_auth_service_1 = require("./services/app.auth.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(authService, apiService) {
        this.authService = authService;
        this.apiService = apiService;
        this.title = 'app';
        this.messages = [];
    }
    Object.defineProperty(AppComponent.prototype, "currentUserJson", {
        get: function () {
            return JSON.stringify(this.currentUser, null, 2);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUser().then(function (user) {
            _this.currentUser = user;
            if (user) {
                _this.addMessage("User Logged In");
            }
            else {
                _this.addMessage("User Not Logged In");
            }
        }).catch(function (err) { return _this.addError(err); });
    };
    AppComponent.prototype.clearMessages = function () {
        while (this.messages.length) {
            this.messages.pop();
        }
    };
    AppComponent.prototype.addMessage = function (msg) {
        this.messages.push(msg);
    };
    AppComponent.prototype.addError = function (msg) {
        this.messages.push("Error: " + msg && msg.message);
    };
    AppComponent.prototype.onLogin = function () {
        var _this = this;
        this.clearMessages();
        this.authService.login().catch(function (err) {
            _this.addError(err);
        });
    };
    AppComponent.prototype.onCallAPI = function () {
        var _this = this;
        this.clearMessages();
        this.apiService.HttpApi().then(function (result) {
            _this.addMessage("API Result: " + JSON.stringify(result));
        }, function (err) { return _this.addError(err); });
    };
    AppComponent.prototype.onRenewToken = function () {
        var _this = this;
        this.clearMessages();
        this.authService.renewToken()
            .then(function (user) {
            _this.currentUser = user;
            _this.addMessage("Silent Renew Success");
        })
            .catch(function (err) { return _this.addError(err); });
    };
    AppComponent.prototype.onLogout = function () {
        var _this = this;
        this.clearMessages();
        this.authService.logout().catch(function (err) { return _this.addError(err); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [app_auth_service_1.AuthService, app_api_service_1.ApiService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map