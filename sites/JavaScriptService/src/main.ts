import { User } from 'oidc-client';
import { ApiService } from "./services/ApiService";
import { AuthService } from "./services/AuthService";
import { Constants } from "./constants";

export class Application {
    apiService: ApiService;
    authService: AuthService;
    currentUser: User;
    errors: Array<string>;
    messages: Array<string>;

    constructor() {
        const self = this;
        self.authService = new AuthService();
        self.apiService = new ApiService(self.authService);
        self.init();
    }
    init() {
        const self = this;
        self.messages = [];
        self.authService.getUser().then(user => {
            self.currentUser = user;
            if (user) {
                self.addMessage("User Logged In");
            }
            else {
                self.addMessage("User Not Logged In");
            }
        }).catch(err => self.addError(err));
    }    
    private addMessage(value: string) {
        const self = this;
        self.messages.push(value);
    }
    private clearMessages() {
        const self = this;
        while (self.messages.length) {
            self.messages.pop();
        }
    }
    private addError(value: string) {
        const self = this;
        self.errors.push(value);
    }

    public onLogin() {
        this.clearMessages();
        this.authService.login().catch(err => {
            this.addError(err);
        });
    }

    public onCallAPI() {
        this.clearMessages();
        this.apiService.callApi(this.currentUser.id_token).then(result => {
            this.addMessage("API Result: " + JSON.stringify(result));
        }, err => this.addError(err));
    }

    public onRenewToken() {
        this.clearMessages();
        this.authService.renewToken()
            .then(user => {
                this.currentUser = user;
                this.addMessage("Silent Renew Success");
            })
            .catch(err => this.addError(err));
    }

    public onLogout() {
        this.clearMessages();
        this.authService.logout().catch(err => this.addError(err));
    }

}