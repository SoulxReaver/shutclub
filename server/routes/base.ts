
    export var routes  = [
        {
            method: 'GET',
            path: '/public/{param*}',
            handler: {
                directory: {
                    path: 'public'
                }
            }
        },
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                console.log('here');
                return reply('Hello, ' + request.auth.credentials.profile.displayName + '!');
            },
            config: {
                auth: 'session', 
            },
            
        }
    
    ];
