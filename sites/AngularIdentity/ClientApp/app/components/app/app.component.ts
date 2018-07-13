import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { User } from 'oidc-client';
import { Observable } from 'rxjs';

import { ApiService } from "../../services/app.api.service";
import { AuthService } from "../../services/app.auth.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: any;
    constructor(private authService: AuthService, private apiService: ApiService) {
    }
    messages: string[] = [];
    get currentUserJson(): string {
        return JSON.stringify(this.currentUser, null, 2);
    }
    ngOnInit(): void {
        const self = this;
        self.authService.getUser().then((user:User) => {
            self.currentUser = user;
            if (user) {
                self.addMessage("User Logged In");
            }
            else {
                self.addMessage("User Not Logged In");
            }
        }).catch(err => this.addError(err));


    }



    clearMessages() {
        while (this.messages.length) {
            this.messages.pop();
        }
    }
    addMessage(msg: string) {
        this.messages.push(msg);
    }
    addError(msg: string | any) {
        this.messages.push("Error: " + msg && msg.message);
    }
    public onLogin() {
        this.clearMessages();
        this.authService.login().catch(err => {
            this.addError(err);
        });
    }
    public onCallAPI() {
        this.clearMessages();
        this.apiService.HttpApi().then((result:any) => {
            this.addMessage("API Result: " + JSON.stringify(result));
        }, err => this.addError(err));
    }
    public onRenewToken() {
        this.clearMessages();
        this.authService.renewToken()
            .then((user:User) => {
                this.currentUser = user;
                this.addMessage("Silent Renew Success");
            })
            .catch(err => this.addError(err));
    }
    public onLogout() {
        this.clearMessages();
        this.authService.logout().catch((err:any) => this.addError(err));
    }
}


// npm i @types/jquery