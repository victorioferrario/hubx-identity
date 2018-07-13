"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
var ApiService = /** @class */ (function () {
    function ApiService(authService) {
        this.authService = authService;
    }
    ApiService.prototype.HttpApi = function () {
        var self = this;
        return self.authService.getUser().then(function (user) {
            if (user && user.access_token) {
                return self.callApi(user.access_token);
            }
            else if (user) {
                return self.authService.renewToken().then(function (user) {
                    return self.callApi(user.access_token);
                });
            }
            else {
                throw new Error("user is not logged in");
            }
        });
    };
    ApiService.prototype.callApi = function (token) {
        return $.ajax({
            url: constants_1.Constants.apiRoot,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        //return this._httpClient.get(Constants.apiRoot + "test", { headers: headers })
        //    .toPromise()
        //    .catch((result: HttpErrorResponse) => {
        //        if (result.status === 401) {
        //            return this._authn.renewToken().then(user => {
        //                return this._callApi(user.access_token);
        //            });
        //        }
        //        throw result;
        //    });
    };
    return ApiService;
}());
exports.ApiService = ApiService;
