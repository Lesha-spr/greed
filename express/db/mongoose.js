'use strict';

const mongoose = require('mongoose');
const config = require('./../config/index');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;