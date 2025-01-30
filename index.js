const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.set('timeout', 60000);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const apiProxy = createProxyMiddleware({
  target: "http://localhost:4000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
  timeout: 60000,
  proxyTimeout: 60000,
  onError: (err, req, res) => {
    console.error('API Proxy Error:', err);
    res.status(500).send('API Proxy Error');
  }
});

const dashboardProxy = createProxyMiddleware({
  target: "http://localhost:5173",
  changeOrigin: true,
  ws: true,
  timeout: 60000,
  proxyTimeout: 60000,
  onError: (err, req, res) => {
    console.error('Dashboard Proxy Error:', err);
    res.status(500).send('Dashboard Proxy Error');
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.use("/api", apiProxy);
app.use("/", dashboardProxy);

app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});