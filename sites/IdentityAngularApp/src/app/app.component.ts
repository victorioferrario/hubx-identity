import { Component } from '@angular/core';
import { ApiService } from "./services/app.api.service";
import { AuthService } from "./services/app.auth.service";
import { User } from 'oidc-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: any;
  constructor(private authService: AuthService, private apiService: ApiService) {
  }
  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  ngOnInit(): void {
    const self = this;
    self.authService.getUser().then((user: User) => {
      self.currentUser = user;
      if (user) {
        self.addMessage("User Logged In");
      }
      else {
        self.addMessage("User Not Logged In");
      }
    }).catch(err => self.addError(err));


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
    const self = this;
    self.messages.push("Error: " + msg && msg.message);
  }
  public onLogin() {
    const self = this;
    console.log(self.authService.settings);
    self.clearMessages();
    self.authService.login().catch(err => {
      self.addError(err);
    });
  }
  public onCallAPI() {
    const self = this;
    self.clearMessages();
    self.apiService.HttpApi().then((result: any) => {
      self.addMessage("API Result: " + JSON.stringify(result));
    }, err => self.addError(err));
  }
  public onRenewToken() {
    const self = this;
    self.clearMessages();
    self.authService.renewToken()
      .then((user: User) => {
        self.currentUser = user;
        self.addMessage(
          "Silent Renew Success");
      })
      .catch(err => self.addError(err));
  }
  public onLogout() {
    this.clearMessages();
    this.authService.logout().catch((err: any) => this.addError(err));
  }
}
