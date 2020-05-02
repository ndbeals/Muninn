// called when importing the file
// export { default } from './api'; // export other default as this default

import router from './routes';

export default async function setupAPI(app) {
  app.use(router);
}
