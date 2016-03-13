

export function combineRoutes(...x: any[]) {
    var array = []
    for (var i = 0; i < x.length; i++) {
        array = array.concat(x[i]);
    }
    return array;
}

