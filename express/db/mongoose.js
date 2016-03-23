'use strict';

const mongoose = require('mongoose');
const config = require('./../config/index');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;