exports.Score = class Score {
    constructor(arg) {
        if (arg instanceof Map) {
            if (arg.has('points')) {
                this.points = arg.get('points');
            }
            if (arg.has('description')) {
                this.description = arg.get('description');
            }
        } else {
            var object = JSON.parse(arg);
            this.points = object.points;
            this.description = object.description;
        }
    }
}