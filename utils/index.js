// index.js
const dir = require('./dir');
const file = require('./file');
const common = require('./common');

module.exports = {
    ...dir,
    ...file,
    ...common
};