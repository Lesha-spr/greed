'use strict';

const mongoose = require('mongoose');
const config = require('./../config/');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;