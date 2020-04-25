import path from "path";

require('dotenv').config({
  path: path.resolve('../', '.env')
})

import pino from "pino";

// module.exports = {
//   config: {
  //     name: process.env.NAME || "Notifying App",
  //     port: process.env.PORT || 8081
  //   },
  //   logger: logger
  // };
  
export const logger = pino();
export const config = {
  name: process.env.NAME || "Notifying App",
  port: process.env.PORT || 8081
}