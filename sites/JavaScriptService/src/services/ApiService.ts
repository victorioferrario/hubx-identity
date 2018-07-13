
//import { AuthService, User } from "./authService";
import { AuthService } from "./AuthService";
import { Constants } from '../constants';

export class ApiService {    
    constructor(public authService:AuthService) {
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
    public callApi(token: string): JQueryPromise<any>{
       return $.ajax({
            url: Constants.apiRoot,
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
    }
}