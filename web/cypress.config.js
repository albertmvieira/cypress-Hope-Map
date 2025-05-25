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
    env: {
      mongodb: {
        uri: 'mongodb+srv://albertmvieira:experience@cluster0.p6cft5w.mongodb.net/Hope?retryWrites=true&w=majority&appName=Cluster0',
        database: 'Hope'
      }
    }
  },
});
