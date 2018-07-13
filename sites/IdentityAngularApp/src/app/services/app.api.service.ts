import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Constants } from '../common/constants';
import {  User } from 'oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from "./app.auth.service";

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }
    public HttpApi(): Promise<any> {
        const self = this;
        return self.authService.getUser().then(user => {
            if (user && user.access_token) {
                return self.callApi(user.access_token);
            }
            else if (user) {
                return self.authService.renewToken().then(user => {
                    return self.callApi(user.access_token);
                });
            }
            else {
                throw new Error("user is not logged in");
            }
        });
    }
    public callApi(token: string): Promise<any>{
        const self = this;
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return self.httpClient.get(Constants.apiRoot + "test", { headers: headers })
            .toPromise()
            .catch((result: HttpErrorResponse) => {
                if (result.status === 401) {
                    return self.authService.renewToken().then(user => {
                        return self.callApi(user.access_token);
                    });
                }
                throw result;
            });
    }
}
