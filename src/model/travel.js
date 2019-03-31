exports.GeographicCoordenate = class GeographicCoordenate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude
    }
}
exports.Travel = class Travel {
    constructor(initial, destination) {
        this.initial = initial;
        this.destination = destination;
    }
}