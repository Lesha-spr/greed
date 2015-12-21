var DEFAULTS = {
    PERCENTAGE_LIMIT: 100
};

var roll = function(chest, key) {
    var i = chest.length;
    var rolling = [];
    var percentage = 0;

    while (i--) {
        var j = 0;

        percentage += chest[i].percentage;

        if (percentage > DEFAULTS.PERCENTAGE_LIMIT) {
            throw new Error('Percents sum is not 100');
        }

        for (j; j < chest[i].percentage; j++) {
            rolling.push(chest[i][key]);
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return rolling[getRandomInt(0, rolling.length - 1)];
};

module.exports = roll;