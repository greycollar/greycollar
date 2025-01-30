const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.use(cors());

const apiProxy = createProxyMiddleware({
  target: "http://127.0.0.1:4000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

const dashboardProxy = createProxyMiddleware({
  target: "http://127.0.0.1:5173",
  changeOrigin: true,
  ws: true,
});

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.use("/api", apiProxy);
app.use("/", dashboardProxy);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});