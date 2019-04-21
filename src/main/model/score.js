exports.Score = class Score {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('travelID')) {
                this.travelID = arg.get('travelID');
            }
            if (arg.has('rol')) {
                this.rol = arg.get('rol');
            }
            if (arg.has('points')) {
                this.points = arg.get('points');
            }
            if (arg.has('description')) {
                this.description = arg.get('description');
            }
        } else {
            this.travelID = arg.travelID;
            this.rol = arg.rol;
            this.points = arg.points;
            this.description = arg.description;
        }
    }
}