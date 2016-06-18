
import { Component } from '@angular/core';
import { ClubComponent } from './club.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare const FB:any;

@Component({
    selector: 'my-home',
    templateUrl: 'app/home.component.html',
    directives: [ ClubComponent ]
})

export class HomeComponent {

    public name;

    constructor(private router: Router) {
        this.name = 'test user';
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            var test = Observable.create(observable =>
                FB.api(
                    localStorage.getItem('userId'),
                    function (response) {
                        if (response && !response.error) {
                            //this.name = response.name;
                            observable.next(response.name);
                        }
                        observable.complete();
                    }
                )
            );
            test.subscribe(name => this.name = name);
        }else if (resp.status === 'not_authorized') {
            this.name = 'test user';
        }else {
            this.name = 'test user';
        }
    };

    ngOnInit() {
        var test = Observable.create(observable =>
            FB.getLoginStatus(response => {
                observable.next(response);
                observable.complete();
            })
        );

        test.subscribe(response => this.statusChangeCallback(response));
    }
}