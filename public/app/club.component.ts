/// <reference path="../../typings/public.d.ts" />

import { Component } from 'angular2/core';
import { Club } from './club';
import { ClubService } from './club.service';
import {  Control, FORM_DIRECTIVES } from "angular2/common";

@Component({
    selector: 'my-club',
    templateUrl: 'app/club.component.html',
    providers: [ ClubService ],
    styleUrls: [ 'app/club.component.css' ],
    directives: [FORM_DIRECTIVES]
})

export class ClubComponent {
    clubs: Club[];
    clubSelect: Control = new Control('all');
    locations: String[];

    constructor(public _clubService: ClubService) {
        this.clubSelect.valueChanges.subscribe((value)=>{
            if(value == 'all')
            {
                this.getAllClubs();
            }
            else {

                this.getClubByLocation(value);
            }
        });
    }
    ngOnInit() {
        this.getListOfLocation();
        this.getAllClubs();
    }
    
    getListOfLocation() {
        this._clubService.getListOfLocation()
            .subscribe((location: any) => {
                this.locations = location
            }, err => console.log(err));
    }
    
    getAllClubs() {
        this._clubService.getAllClubs()
            .subscribe((clubs: any) => {
                this.clubs = clubs
            }, err => console.log(err));
    }

    getClubByLocation(location) {
        this._clubService.getClubByLocation(location)
            .subscribe((clubs: any) => {
                this.clubs = clubs
            }, err => console.log(err));
    }

}