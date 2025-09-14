const express = require("express");
const corsAnywhere = require("cors-anywhere");

const app = express();
const port = 8080; // Use any available port

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
});

app.use("/", (req, res) => {
  req.url = req.url.replace("/proxy/", ""); // Remove "/proxy" prefix
  proxy.emit("request", req, res);
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
