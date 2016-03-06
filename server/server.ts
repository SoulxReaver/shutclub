
/// <reference path="../typings/server.d.ts" />

// Node modules
import * as assert from 'assert';
import * as Inert from 'inert';
import { Server } from 'hapi';
import { join } from 'path';

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

server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply.redirect('/public');
    },
    config: { auth: false }
}, {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
}]);

server.start((err) => {
    assert.ifError(err);
    global.console.log('project starting:' +
        '\n\tHost: ' + server.info.host +
        '\n\tURI: ' + server.info.uri )
});

