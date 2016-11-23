// Mocha and enzyme test setup
// from : https://github.com/lelandrichardson/enzyme-example-mocha/blob/master/test/.setup.js
require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.window.$ = global.$ = require('jquery');
global._ = require('lodash');

Object.keys(document.defaultView).forEach(function (property) {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document; // jshint ignore:line
