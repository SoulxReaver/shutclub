var jsonobject = [
    {
        "clubName": "club1",
        "Location": "sea",
        "state":"WA"
    },
    {
        "clubName": "club2",
        "Location": "bell",
        "state": "CA"
    },
    {
        "clubName": "club3",
        "Location": "sea",
        "state": "OR"
    },
    {
        "clubName": "club4",
        "Location": "bell",
        "state": "tx"
    }
]

export function findAll() {
    return jsonobject
}

export function findlocation(location) {
    var obj = []
    for ( var x in jsonobject) {
        if(location == jsonobject[x]['Location'])
        {
            obj.push(jsonobject[x]);
        }
    }
    return obj
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