var travelModel = require('../../model/travel');

exports.DriverSearchDTO = class DriverSearchDTO {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('userId')) {
                this.userId = arg.get('userId');
            }
            if (arg.has('from')) {
                this.from = new geograficCoordenate.GeographicCoordenate(arg.get('from'));
            }
            if (arg.has('to')) {
                this.to = new geograficCoordenate.GeographicCoordenate(arg.get('to'));
            }
        } else {
            this.userId = arg.userId;
            this.from = new travelModel.GeographicCoordenate(arg.from);
            this.to = new travelModel.GeographicCoordenate(arg.to);
        }
    }
}