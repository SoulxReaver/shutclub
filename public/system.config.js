///<reference path="../typings/browser.d.ts"/>
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
        'rxjs': 'libs/rxjs',
        'angular2-in-memory-web-api': 'libs/angular2-in-memory-web-api',
        '@angular': 'libs/@angular',
        'jquery': 'https://code.jquery.com/jquery-1.10.2.js'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'boot.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' }
    };
    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
    ];
    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });
    var config = {
        baseURL: '/',
        map: map,
        packages: packages
    };
    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }
    System.config(config);
})(this);
//# sourceMappingURL=system.config.js.map