
import { Component } from '@angular/core';
import { Club } from './club';
import { ClubService } from './club.service';
import {  Control, FORM_DIRECTIVES } from "@angular/common";

declare const FB:any;


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
    public accessGranted: boolean;

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

        this.accessGranted = false;
    }
    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
    
    statusChangeCallback(resp) {
        if (resp.status === 'connected') {

            this.getListOfLocation();
            this.getAllClubs();
            this.accessGranted = true;
        }else if (resp.status === 'not_authorized') {
            this.accessGranted = false;
        }else {
            this.accessGranted = false;
        }
    };
    
    getListOfLocation() {
        this._clubService.getAllClubs().subscribe((clubs: any) => {
                let listOfLocation = [];
                jQuery.each(clubs, function (index:number, club:Club) {
                    listOfLocation.push(club.location);
                });
                jQuery.unique(listOfLocation);
                this.locations = listOfLocation;
            }, err => console.log(err));
    }
    
    getAllClubs() {
        this._clubService.getAllClubs()
            .subscribe((clubs: any) => {
                this.clubs = clubs
            }, err => console.log(err));
    }

    getClubByLocation(location: string) {
        this._clubService.getAllClubs()
            .subscribe((clubs: any) => {
                let clubCollection = [];
                jQuery.each(clubs, function (index:number, club:Club) {
                    if(club.location == location)
                    {
                        clubCollection.push(club);
                    }
                });
                
                this.clubs = clubCollection
            }, err => console.log(err));
    }


}