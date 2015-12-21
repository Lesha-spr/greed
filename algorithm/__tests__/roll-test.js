jest.dontMock('./../roll.js');

var roll, rolls, chest, hits, key, error;

describe('roll', function() {
    roll = require('./../roll');
    rolls = 1000;
    error = 5;
    error = rolls / 100 * error;
    key = '_id';
    hits = {};

    beforeEach(function() {
        chest = [
            {
                _id: 1,
                percentage: 10
            },
            {
                _id: 2,
                percentage: 90
            }
        ];

        chest.forEach(function(item) {
            hits[item[key]] = {
                count: 0,
                percentage: item.percentage
            };
        });
    });

    it('should throw error on non 100 percentage sum', function() {
        chest = [
            {
                _id: 1,
                percentage: 50
            },
            {
                _id: 2,
                percentage: 60
            }
        ];

        expect(function() {
            roll(chest, key);
        }).toThrow(new Error('Percents sum is not 100'));
    });

    it('should roll by percentages', function() {
        for (var i = 0; i < rolls; i++) {
            hits[roll(chest, key)].count++;
        }

        Object.keys(hits).forEach(function(hit) {
            var maxEdge = hits[hit].count <= (error + hits[hit].percentage * rolls / 100);
            var minEdge = hits[hit].count >= (hits[hit].percentage * rolls / 100 - error);

            expect(maxEdge && minEdge).toBe(true);
        });
    });
});