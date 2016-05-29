///<reference path="../../typings/browser.d.ts"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import {LocationStrategy,
    HashLocationStrategy} from '@angular/common';
import {provide}           from '@angular/core';
// Add all operators to Observable
import 'rxjs/Rx';
import 'jquery';
import {FacebookLoginComponent} from "./facebooklogin.component";

bootstrap(FacebookLoginComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy,
        {useClass: HashLocationStrategy})
]);