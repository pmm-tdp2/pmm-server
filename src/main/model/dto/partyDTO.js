var travelModel = require('../../model/travel');

exports.DriverSearchDTO = class DriverSearchDTO {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('userID')) {
                this.userID = arg.get('userID');
            }
            if (arg.has('from')) {
                this.from = new geograficCoordenate.GeographicCoordenate(arg.get('from'));
            }
            if (arg.has('to')) {
                this.to = new geograficCoordenate.GeographicCoordenate(arg.get('to'));
            }
            if (arg.has('petSmallAmount')) {
                this.petSmallAmount = arg.get('petSmallAmount');
            }
            if (arg.has('petMediumAmount')) {
                this.petMediumAmount = arg.get('petMediumAmount');
            }
            if (arg.has('petLargeAmount')) {
                this.petLargeAmount = arg.get('petLargeAmount');
            }
            if (arg.has('hasACompanion')) {
                this.hasACompanion = arg.get('hasACompanion');
            }
        } else {
            this.userID = arg.userID;
            this.from = new travelModel.GeographicCoordenate(arg.from);
            this.to = new travelModel.GeographicCoordenate(arg.to);
            this.petSmallAmount = arg.petSmallAmount;
            this.petMediumAmount = arg.petMediumAmount;
            this.petLargeAmount = arg.petLargeAmount;
            this.hasACompanion = arg.hasACompanion;
        }
    }
}

class PartyDTO {
    constructor() {
        this.id;
        this.firstName;
        this.lastName;
    }
}

exports.DriverDTO = class DriverDTO extends PartyDTO {
    constructor() {
        super();
        this.license;
    }
}

exports.UserDTO = class UserDTO extends PartyDTO {
    constructor() {
        super();
    }
}