const nodemon = require('nodemon');
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    nodemon({
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
            NODE_ENV: 'development'
        },
        ext: 'js json'
    });

    nodemon.on('start', function() {
        console.log('App has started');
    }).on('quit', function() {
        console.log('App has quit');
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });
} else {
    require('./bin/www');
}