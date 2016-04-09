import clubs  = require('.././controllers/clubs');
export var routes  = [
    {
        method: 'GET',
        path: '/clubs',
        handler: function(request, reply) {
            reply(clubs.findAll());
        }
    }
];
