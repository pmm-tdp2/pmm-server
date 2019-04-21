var traveModel = require('../model/travel');

exports.Trace = class Trace {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('userID')) {
                this.from = arg.get('userID');
            }
            if (arg.has('driverID')) {
                this.to = arg.get('driverID');
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
            this.userID = arg.userID;
            this.driverID = arg.driverID
            this.geograficCoordenate = new traveModel.GeographicCoordenate(arg.geograficCoordenate);
        }
    }
}