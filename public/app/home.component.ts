/// <reference path="../../typings/public.d.ts" />

import { Component } from 'angular2/core';
import { ClubComponent } from './club.component';

@Component({
    selector: 'my-home',
    templateUrl: 'app/home.component.html',
    directives: [ ClubComponent ]
})

export class HomeComponent {

    constructor() { }

}