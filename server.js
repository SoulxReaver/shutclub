'use strict';
var Path = require('path');
var Inert = require('inert');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection(
    {
        port: 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
);

server.register(Inert, function () {});

server.route( [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    }
]);



server.start(function()  {
    console.log('Server running at:', server.info.uri);
});