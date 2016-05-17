
/// <reference path="../typings/main.d.ts" />
// Node modules
import * as assert from 'assert';
import * as Inert from 'inert';
import { Server } from 'hapi';
import bell = require('bell');
import cookie = require('hapi-auth-cookie');

import utils  = require('./utils');
import base = require('./routes/base');
import clubs = require('./routes/clubs');

var server = new Server();

server.connection({
    port: 3000
});

// third party plug-ins
server.register([
    Inert
], (err) => {
    assert.ifError(err);
});

server.register([
    bell,
    cookie
], function (err)  {

    //Setup the session strategy
    server.auth.strategy('session', 'cookie', false, {
        password: '', 
        redirectTo: '/auth/facebook', 
        isSecure: false 
    });

    server.auth.strategy('facebook', 'bell', false, {
        provider: 'facebook',
        password: '',
        clientId: '',
        clientSecret: '',
        isSecure: false     
    });

    server.route(
        
            {
                path: '/auth/facebook',
                method: ['GET','POST'],
                config: {
                    auth: 'facebook'
                },
                handler: function (request, reply) {

                    if (!request.auth.isAuthenticated) {
                        return reply('Authentication failed due to: ' + request.auth.error.message);
                    }

                    return reply.redirect('/home');
                }
            }
        
    );
});

server.route(
    utils.combineRoutes(
        base.routes,
        clubs.routes
    )
);

server.start((err) => {
    assert.ifError(err);
    global.console.log('project starting:' +
        '\n\tHost: ' + server.info.host +
        '\n\tURI: ' + server.info.uri )
});

