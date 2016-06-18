import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Observable } from 'rxjs/Observable';

declare const FB:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'app/login.html',
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {

    public showSignin:boolean;
    public showLogout:boolean;

    constructor() {
        FB.init({
            appId      : '1752803258266614',
            status     : true,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.4'
        });
    }

    onFacebookLoginClick() {
        var obser:Observable<any>;
        if(this.showSignin)
        {
            obser = Observable.create(observable =>
                FB.login(
                    function(response) {
                        if (response.authResponse) {
                            localStorage.setItem('userId', response.authResponse.userID);
                            localStorage.setItem('accessToken', response.authResponse.accessToken);
                            observable.next(null);
                        } else {
                            observable.next(true);
                        }
                        observable.complete();
                    }
                )
            );
        }
        else {
            obser = Observable.create(observable =>
                FB.logout(
                    function(response) {
                        if (response.authResponse) {
                            localStorage.removeItem('userId');
                            localStorage.removeItem('accessToken');
                            observable.next(true);
                        } else {
                            observable.next(null);
                        }
                        observable.complete();
                    }
                )
            );
        }
        obser.subscribe(x => this.toggleSignInButton(x));
    }

    toggleSignInButton(turnOnSignIn) {
        if(turnOnSignIn) {
            this.showSignin = true;
            this.showLogout = null;
        }
        else {
            this.showLogout = true;
            this.showSignin = null;
        }
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            localStorage.setItem('userId', resp.authResponse.userID);
            localStorage.setItem('accessToken', resp.authResponse.accessToken);
            this.toggleSignInButton(null);
        }else if (resp.status === 'not_authorized') {
            this.toggleSignInButton(true);
        }else {
            this.toggleSignInButton(true);
        }
    };

    ngOnInit() {
        var obser = Observable.create(observable =>
            FB.getLoginStatus(response => {
                observable.next(response);
                observable.complete();
            })
        );
        obser.subscribe(response => this.statusChangeCallback(response));
    }
}