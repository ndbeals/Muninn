"use strict";

// import initializeAPI from "./api";

// called when importing the file

// console.log("index.js");

// import initializeAPI from "./api";
// export default initializeAPI;


import Handler from "./handler";
export {Handler};
// export Handler from "./handler"; 
// export * from "./handler"; 
// export default events =  {handlers};
// export {handlers as default}
export {NotifierHandler, registeredHandlers } from "./handler";