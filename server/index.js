// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
const { resolve } = require('path');

module.paths.push(resolve('./../'));
console.log(process.env.NODE_PATH, module.paths);

require = require('esm')(module /* , options */);
module.exports = require('./main.js');
