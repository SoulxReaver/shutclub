/// <reference path="../../typings/public.d.ts" />

import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { HomeComponent } from "./home.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ ROUTER_DIRECTIVES ]
})

@RouteConfig([
    {path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true}
])
export class AppComponent {
    constructor(){}
    public title = "ShutClub";
}
