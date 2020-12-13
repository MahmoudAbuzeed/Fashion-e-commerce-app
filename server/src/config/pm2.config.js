const path = require("path");

module.exports = {
  apps: ["src"].map((name) => ({
    name,
    cwd: path.resolve(__dirname, `../..`),
    script: "./src/server.js",
    watch: [".", "../shared", "../../node_modules"],
    instance_var: "INSTANCE_ID",
    env: {
      NODE_ENV: "development",
      NODE_PATH: path.resolve(__dirname, "./node_modules"),
    },
  })),
};
