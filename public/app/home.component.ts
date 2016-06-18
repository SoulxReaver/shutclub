
import { Component } from '@angular/core';
import { ClubComponent } from './club.component';

declare const FB:any;

@Component({
    selector: 'my-home',
    templateUrl: 'app/home.component.html',
    directives: [ ClubComponent ]
})

export class HomeComponent {

    public name;

    constructor() {
        this.name = 'test user';
    }

    ngDoCheck() {
        if(localStorage.getItem('name'))
        {
            this.name = localStorage.getItem('name');
        }
        else {
            this.name = 'test user';
        }
    }

    ngOnInit() {    }
}