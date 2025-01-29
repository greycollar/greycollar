const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const apiProxy = createProxyMiddleware({
  target: "http://localhost:4000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

const dashboardProxy = createProxyMiddleware({
  target: "http://localhost:5173",
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

