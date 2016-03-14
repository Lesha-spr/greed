var mongoose = require('mongoose');
var config = require('./../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;