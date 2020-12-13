const morgan = require("morgan");
const logger = require("./logger");

const format = ":requestId :method :url :status :response-time ms";

// Set Request Id To Be Unique For Each Request On The Server
morgan.token("requestId", (request) => request.id);

// Sent Message to Logger info
const options = {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
};

module.exports = morgan(format, options);
