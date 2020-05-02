const pino = require('pino');

const logger = pino({
  name: 'Muninn',
});

export default logger;
