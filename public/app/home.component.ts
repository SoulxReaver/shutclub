/// <reference path="../../typings/public.d.ts" />

import { Component } from 'angular2/core';
import { Club } from './club';
import { ClubService } from './club.service';

@Component({
    selector: 'my-home',
    templateUrl: 'app/home.component.html',
    providers: [ ClubService ]
})

export class HomeComponent {
    clubs: Club[];

    constructor(public _clubService: ClubService) { }
    ngOnInit() {
        this.getAllClubs();
    }
    getAllClubs() {
        this._clubService.getAllClubs('http://localhost:3000/clubs')
            .subscribe((clubs: any) => {
                this.clubs = clubs
            }, err => console.log(err));
    }

}