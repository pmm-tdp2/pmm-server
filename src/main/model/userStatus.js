exports.UserStatus = class UserStatus {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('userStatusID')) {
                this.userStatusID = arg.get('userStatusID');
            }
            if (arg.has('description')) {
                this.description = arg.get('description');
            }
        } else {
            this.userStatusID = arg.userStatusID;
            this.description = arg.description
        }
    }
}