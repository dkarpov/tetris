// main gulp config file
require('babel-register')({
    presets: ['es2015'],
    // adding ES6 support in gulp config files (import .. from ...)
    nonStandard: process.env.ALLOW_JSX
});

// another gulp config file
require('./gulpfile.babel.js');
