var traveModel = require('../model/travel');

exports.Trace = class Trace {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('userId')) {
                this.from = arg.get('userId');
            }
            if (arg.has('driverId')) {
                this.to = arg.get('driverId');
            }
            var latitude = undefined;
            var longitude = undefined;
            if (arg.has('latitude')) {
                latitude = arg.get('latitude');
            }
            if (arg.has('longitude')) {
                longitude = arg.get('longitude');
            }
            var geograficCoodenateMap = new Map;
            geograficCoodenateMap.set('latitude', latitude);
            geograficCoodenateMap.set('longitude', longitude);
            this.geograficCoordenate = new traveModel.GeographicCoordenate(geograficCoodenateMap);
        } else {
            this.userId = arg.userId;
            this.driverId = arg.driverId
            this.geograficCoordenate = new traveModel.GeographicCoordenate(arg.geograficCoordenate);
        }
    }
}