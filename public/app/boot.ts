/// <reference path="../../typings/public.d.ts" />
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { AppComponent } from './app.component'
import {bind} from "angular2/core";



bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);