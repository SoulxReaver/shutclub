/// <reference path="../../typings/public.d.ts" />

import { Component, View, Type } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { bootstrap } from 'angular2/platform/browser';
import { RouteConfig, Router, RouterLink, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
    selector: 'my-app'
})
@View({
    template: '<h1>My First Angular 2 App</h1>',
    directives: [ CORE_DIRECTIVES ]
})

export class App {
    constructor() {}
}

bootstrap(<Type> App, [ HTTP_PROVIDERS, ROUTER_PROVIDERS ]);