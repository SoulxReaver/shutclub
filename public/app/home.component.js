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
var club_component_1 = require('./club.component');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
        this.name = 'test user';
    }
    HomeComponent.prototype.statusChangeCallback = function (resp) {
        var _this = this;
        if (resp.status === 'connected') {
            var test = Observable_1.Observable.create(function (observable) {
                return FB.api(localStorage.getItem('userId'), function (response) {
                    if (response && !response.error) {
                        //this.name = response.name;
                        observable.next(response.name);
                    }
                    observable.complete();
                });
            });
            test.subscribe(function (name) { return _this.name = name; });
        }
        else if (resp.status === 'not_authorized') {
            this.name = 'test user';
        }
        else {
            this.name = 'test user';
        }
    };
    ;
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var test = Observable_1.Observable.create(function (observable) {
            return FB.getLoginStatus(function (response) {
                observable.next(response);
                observable.complete();
            });
        });
        test.subscribe(function (response) { return _this.statusChangeCallback(response); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'my-home',
            templateUrl: 'app/home.component.html',
            directives: [club_component_1.ClubComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map