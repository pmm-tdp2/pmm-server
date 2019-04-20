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
            this.latitude = arg.latitude;
            this.longitude = arg.longitude;
        }
    }
}
exports.Travel = class Travel {
    constructor(id, from, to) {
        this.travelID = id;
        this.from = from;
        this.to = to;
        this.driverId;
        this.userId;
        this.time;
        this.price;
        this.status = [];
    }
}