var _ = require('lodash');

var jsonobject = [
    {
        "clubName": "club1",
        "location": "sea",
        "state":"WA"
    },
    {
        "clubName": "club2",
        "location": "bell",
        "state": "CA"
    },
    {
        "clubName": "club3",
        "location": "sea",
        "state": "OR"
    },
    {
        "clubName": "club4",
        "location": "bell",
        "state": "tx"
    }
]

export function findAll() {
    return jsonobject
}

export function getListOfLocation() {
    var obj = [];
    for ( var x in jsonobject) {
        if(!_.includes(obj, jsonobject[x]['location'])) {
            obj.push(jsonobject[x]['location']);
        }
    }
    return obj.sort();
}

export function getClubsByLocation(location) {
    var obj = []
    for ( var x in jsonobject) {
        if(location == jsonobject[x]['location']) {
            obj.push(jsonobject[x]);
        }
    }
    return _.sortBy(obj, [location]);
}

// function findlocationAndState(location, state) {
//     var obj = []
//     for ( var x in jsonobject) {
//         if(location == jsonobject[x]['Location'] && state == jsonobject[x]['state'])
//         {
//             obj.push(jsonobject[x]);
//         }
//     }
//     return obj
// }