import {Injectable} from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class ClubService {
    constructor(public http: Http) {}
    
    getAllClubs() {
        return this.http.get('http://localhost:3000/clubs').map(response => {
            return response.json();
        })
    }
    
    getListOfLocation() {
        return this.http.get('http://localhost:3000/listOfLocations').map(response => {
            return response.json();
        })
    }
    
    getClubByLocation(location) {
        return this.http.get('http://localhost:3000/getClubsByLocation/' + location).map(response => {
            return response.json();
        })
    }
}