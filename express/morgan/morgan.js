'use strict';

const FileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');
const root = require('app-root-path');

module.exports = morgan('combined', {stream: FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: `${root}/log/access-%DATE%.log`,
    frequency: 'daily',
    verbose: false
}), skip: (req, res) => res.statusCode < 400});