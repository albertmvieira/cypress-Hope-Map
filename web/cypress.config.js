require('dotenv').config({ path: './.env' });

const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const { configurePlugin } = require ('cypress-mongodb');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
      config = cypressBrowserPermissionsPlugin(on, config);
      config.env.browserPermissions = {
        geolocation: 'allow',
        notifications: 'allow',
        camera: 'allow',
        microphone: 'allow',
      };
      return config;
    },
    baseUrl: process.env.BASE_URL,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    video: true,
    retries:{
      runMode: 1,
      openMode: 0
    },
    env: {
      baseAPIUrl: process.env.BASE_API_URL,
      mongodb: {
        uri: process.env.MONGO_URI,
        database: process.env.DATABASE_NAME
      }
    }
  },
});
