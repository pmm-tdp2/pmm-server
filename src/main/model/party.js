class Party {
    constructor(firstName, lastName) {
        this.id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

exports.Driver = class Driver extends Party {
    constructor(firstName, lastName, license) {
        super(firstName, lastName);
        this.license = license;
    }
}

exports.User = class User extends Party {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
}