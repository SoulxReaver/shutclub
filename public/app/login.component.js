var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var Observable_1 = require('rxjs/Observable');
var LoginComponent = (function () {
    function LoginComponent() {
        FB.init({
            appId: '1752803258266614',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.4'
        });
    }
    LoginComponent.prototype.onFacebookLoginClick = function () {
        var _this = this;
        var obser;
        if (this.showSignin) {
            obser = Observable_1.Observable.create(function (observable) {
                return FB.login(function (response) {
                    if (response.authResponse) {
                        localStorage.setItem('userId', response.authResponse.userID);
                        localStorage.setItem('accessToken', response.authResponse.accessToken);
                        observable.next(null);
                    }
                    else {
                        observable.next(true);
                    }
                    observable.complete();
                });
            });
        }
        else {
            obser = Observable_1.Observable.create(function (observable) {
                return FB.logout(function (response) {
                    if (response.authResponse) {
                        localStorage.removeItem('userId');
                        localStorage.removeItem('accessToken');
                        observable.next(true);
                    }
                    else {
                        observable.next(null);
                    }
                    observable.complete();
                });
            });
        }
        obser.subscribe(function (x) { return _this.toggleSignInButton(x); });
    };
    LoginComponent.prototype.toggleSignInButton = function (turnOnSignIn) {
        if (turnOnSignIn) {
            this.showSignin = true;
            this.showLogout = null;
        }
        else {
            this.showLogout = true;
            this.showSignin = null;
        }
    };
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        if (resp.status === 'connected') {
            localStorage.setItem('userId', resp.authResponse.userID);
            localStorage.setItem('accessToken', resp.authResponse.accessToken);
            this.toggleSignInButton(null);
        }
        else if (resp.status === 'not_authorized') {
            this.toggleSignInButton(true);
        }
        else {
            this.toggleSignInButton(true);
        }
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        var obser = Observable_1.Observable.create(function (observable) {
            return FB.getLoginStatus(function (response) {
                observable.next(response);
                observable.complete();
            });
        });
        obser.subscribe(function (response) { return _this.statusChangeCallback(response); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'facebook-login',
            templateUrl: 'app/login.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map