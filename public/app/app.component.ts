import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./login.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ ROUTER_DIRECTIVES, LoginComponent ]
})

@Routes([
    {path: '/home',  component: HomeComponent}
])

export class AppComponent {
    public title = "ShutClub";

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}
