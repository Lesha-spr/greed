'use strict';

const app = require('./express/app');
const NODE_ENV = process.env.NODE_ENV || 'development';
const stormpath = require('express-stormpath');

app.on('stormpath.ready', () => {
    if (NODE_ENV === 'development') {
        require('nodemon')({
            script: './bin/www',
            restartable: 'rs',
            ignore: [
                '.git',
                'node_modules/**/node_modules'
            ],
            verbose: true,
            execMap: {
                js: 'node --harmony'
            },
            watch: [
                'express/'
            ],
            env: {
                NODE_ENV: NODE_ENV
            },
            ext: 'js json'
        }).on('start', function() {
            console.log('App has started');
        }).on('quit', function() {
            console.log('App has quit');
        }).on('restart', function(files) {
            console.log('App restarted due to: ', files);
        });
    } else {
        require('./bin/www');
    }
});