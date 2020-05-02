import pino from 'pino';

console.log('shared');

export function errorStructure(msg) {
  return {
    value: 0,
    msg,
    param: '',
    location: '',
  };
}

console.log('pino: ', pino);

export { default as logger } from './logger';

export default {};
