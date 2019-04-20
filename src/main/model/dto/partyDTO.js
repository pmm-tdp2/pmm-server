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
            if (arg.has('petSmallAmount')) {
                this.petSmallAmount = new geograficCoordenate.GeographicCoordenate(arg.get('petSmallAmount'));
            }
            if (arg.has('petMediumAmount')) {
                this.petMediumAmount = new geograficCoordenate.GeographicCoordenate(arg.get('petMediumAmount'));
            }
            if (arg.has('petLargeAmount')) {
                this.petLargeAmount = new geograficCoordenate.GeographicCoordenate(arg.get('petLargeAmount'));
            }
            if (arg.has('hasACompanion')) {
                this.hasACompanion = new geograficCoordenate.GeographicCoordenate(arg.get('hasACompanion'));
            }
        } else {
            this.userId = arg.userId;
            this.from = new travelModel.GeographicCoordenate(arg.from);
            this.to = new travelModel.GeographicCoordenate(arg.to);
            this.petSmallAmount = new travelModel.GeographicCoordenate(arg.petSmallAmount);
            this.petMediumAmount = new travelModel.GeographicCoordenate(arg.petMediumAmount);
            this.petLargeAmount = new travelModel.GeographicCoordenate(arg.petLargeAmount);
            this.hasACompanion = new travelModel.GeographicCoordenate(arg.hasACompanion);
        }
    }
}