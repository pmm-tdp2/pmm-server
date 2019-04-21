var baseModel = require('../model/base') 

var status = undefined;

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

exports.Statu = class Statu extends baseModel.Base {
    constructor() {
        super();
    }
} 

exports.Travel = class Travel {
    constructor(id, from, to) {
        this.travelID = id;
        this.from = from;
        this.to = to;
        this.driverId;
        this.userId;
        this.petAmountSmall;
        this.petAmountMedium;
        this.petAmountLarge;
        this.hasACompanion;
        this.distance;
        this.time;
        this.price;
        this.status = new Map();
    }
}

exports.getAllStatus = function getAllStatus() {
    if (status === undefined) {
        var cotizated = new Status(1, "cotizated");
        var userConfirmated = new Status(2, "user confirmated");
        var driverConfirmated = new Status(3, "driver confirmated");
        var finalized = new Status(4, "finalized");
        status.set(1, cotizated);
        status.set(2, userConfirmated);
        status.set(3, driverConfirmated);
        status.set(4, finalized);
    }
    return status;
}