
import { Component } from '@angular/core';
import { Club } from './club';
import { ClubService } from './club.service';
import { Control } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'my-club',
    templateUrl: 'app/club.component.html',
    providers: [ ClubService ],
    styleUrls: [ 'app/club.component.css' ]
})

export class ClubComponent {
    clubs: Club[];
    clubSelect: Control = new Control('all');
    locations: String[];

    constructor(public _clubService: ClubService, private router: Router) {

        this.getAllClubs();
        this.getListOfLocation();

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

    clicked(clubId) {
        this.router.navigate(['/club/', clubId ]);
    }
}