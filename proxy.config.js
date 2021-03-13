const proxy = {
  "/api/*": {
    "target": "http://localhost:5001/",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
};
module.exports = proxy;