const config = {
  password_options: {
    bcrypt_salt_rounds: 10,
  },
};

// for (const key in Object.keys(config)) {
//   if (config.hasOwnProperty(key)) {
//     // const element = config[key];
//     // export const key
//     // console.log(key, module);
//     module.exports[key] = config[key];
//   }
// }

// Object.entries(config).forEach((key, val) => {
//   console.log('export map: ', key, val);
// });

for (const [key, value] of Object.entries(config)) {
  console.log('config load: ', key, ' | ', value);
  module.exports[key] = value;
}

console.log('module expos: ', module.exports, '  |');
