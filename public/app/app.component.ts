import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ ROUTER_DIRECTIVES ]
})    


export class AppComponent {
    public title = "ShutClub";

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}
