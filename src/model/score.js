exports.Score = class Score {
    constructor(argmap) {
        if (argmap.has('json')) {
            this.points = argmap.get('json').points;
            this.description = argmap.get('json').description;
        } else {
            if (argmap.has('points')) {
                this.points = argmap.get('points');
            }
            if (argmap.has('description')) {
                this.description = argmap.get('description');
            }
        }
    }
}