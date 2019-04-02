exports.GeographicCoordenate = class GeographicCoordenate {
    constructor(argmap) {
        if (argmap.has('json')) {
            this.latitude = argmap.get('json').latitude;
            this.longitude = argmap.get('json').longitude;
        } else {
            if (argmap.has('latitude')) {
                this.latitude = argmap.get('latitude');
            }
            if (argmap.has('longitude')) {
                this.longitude = argmap.get('longitude');
            }
        }
    }
}
exports.Travel = class Travel {
    constructor(initial, destination) {
        this.initial = initial;
        this.destination = destination;
    }
}