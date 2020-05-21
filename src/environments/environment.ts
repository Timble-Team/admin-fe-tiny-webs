// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // API_URL_DEV: 'http://localhost:3013/api'
  API_URL_DEV: 'http://api.timble.asia/api',
  firebaseConfig: {
    apiKey: 'AIzaSyCAOFv80f_-o_30x5MQf-1T-nSbqtmxAR8',
    authDomain: 'prod-tiny-webs.firebaseapp.com',
    databaseURL: 'https://prod-tiny-webs.firebaseio.com',
    projectId: 'prod-tiny-webs',
    storageBucket: 'prod-tiny-webs.appspot.com',
    messagingSenderId: '483204321551',
    appId: '1:483204321551:web:90a5541b74ac2633662e7a',
    measurementId: 'G-CY55EEMJM6'
  }
};
