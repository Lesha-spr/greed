const DEFAULTS = {
    PERCENTAGE_LIMIT: 100
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = (chest, key) => {
    let i = chest.length;
    let rolling = [];
    let percentage = 0;

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

    return rolling[getRandomInt(0, rolling.length - 1)];
};