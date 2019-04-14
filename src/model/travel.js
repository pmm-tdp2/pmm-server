exports.GeographicCoordenate = class GeographicCoordenate {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('latitude')) {
                this.latitude = arg.get('latitude');
            }
            if (arg.has('longitude')) {
                this.longitude = arg.get('longitude');
            }
        } else {
            /*
             * Is a json
            */
            this.latitude = arg.latitude;
            this.longitude = arg.longitude;
        }
    }
}
exports.Travel = class Travel {
    constructor(initial, destination) {
        this.initial = initial;
        this.destination = destination;
    }
}