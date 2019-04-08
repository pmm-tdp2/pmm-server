exports.Score = class Score {
    constructor(argmap) {
        if (argmap.has('json')) {
            this.point = argmap.get('json').point;
            this.description = argmap.get('json').description;
        } else {
            if (argmap.has('point')) {
                this.point = argmap.get('point');
            }
            if (argmap.has('description')) {
                this.description = argmap.get('description');
            }
        }
    }
}