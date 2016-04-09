import {Injectable} from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class ClubService {
    constructor(public http: Http) {}
    
    getAllClubs(url) {
        return this.http.get(url).map(response => {
            return response.json();
        })
    }
}