import clubs  = require('.././controllers/clubs');
export var routes  = [
    {
        method: 'GET',
        path: '/clubs',
        handler: function(request, reply) {
            reply(clubs.findAll());
        }
    },
    {
        method: 'GET',
        path: '/listOfLocations',
        handler: function(request, reply) {
            reply(clubs.getListOfLocation());
        }
    },
    {
        method: 'GET',
        path: '/getClubsByLocation/{location}',
        handler: function(request, reply) {
            reply(clubs.getClubsByLocation(request.params.location));
        }
    }
];
