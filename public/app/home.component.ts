
import { Component } from '@angular/core';
import { ClubComponent } from './club.component';

@Component({
    selector: 'my-home',
    templateUrl: 'app/home.component.html',
    directives: [ ClubComponent ]
})

export class HomeComponent {

    constructor() { }

}