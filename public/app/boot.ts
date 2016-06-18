///<reference path="../../typings/browser.d.ts"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {provide}           from '@angular/core';
// Add all operators to Observable
import 'rxjs/Rx';
import 'jquery';
import {AppComponent} from "./app.component";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF,
        {useValue: '/'})
]);