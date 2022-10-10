import { defineConfig } from "cypress";

export default defineConfig({
  //@ts-ignore
  component: {
    setupNodeEvents(on, config) {
      videoRecording: true;
    },
    specPattern: "src/**/*.test.{js,ts,jsx,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
