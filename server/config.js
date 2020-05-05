const pino = require('pino');
const YAML = require('yaml');
const fs = require('fs');

const logger = pino({
  name: 'Muninn',
  level: 'trace',
});
module.exports.logger = logger;

logger.trace('Loading config.js');

const file = fs.readFileSync('../config/server.yml', 'utf-8');
const config = YAML.parse(file);
for (const [key, value] of Object.entries(config)) {
  logger.trace(`loading config key of "${key}" with value: "${value}"`);
  module.exports[key] = value;
}
