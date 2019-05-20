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

var PartyDTO = class PartyDTO {
    constructor() {
        this.partyID;
        this.firstName;
        this.lastName;
    }
}

exports.PartyDTO = PartyDTO;

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

exports.PartyCredentialsRequestDTO = class PartyCredentialsRequestDTO {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('id')) {
                this.partyID = arg.get('id');
            }
            if (arg.has('rol')) {
                this.rol = arg.get('rol');
            }
            if (arg.has('firstName')) {
                this.firstName = arg.get('firstName');
            }
            if (arg.has('lastName')) {
                this.lastName = arg.get('lastName');
            }
        } else {
            this.partyID = arg.id;
            this.rol = arg.rol;
            this.firstName = arg.firstName;
            this.lastName = arg.lastName;
        }
        this.name = this.firstName + " " + this.lastName;
    }
}