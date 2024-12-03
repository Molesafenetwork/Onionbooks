const express = require("express");
const path = require("path");
const requestIp = require("request-ip");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Use request-ip middleware for IP geolocation
app.use(requestIp.mw());

// Create directory if not exists
const createDirectory = () => {
  if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
  }
};


// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/seo.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'seo.json'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'robots.txt'));
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "store.html"));
});


app.get("/company-info", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "company-info.html"));
});

app.get("/directories", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "directories.html"));
});

// Create new pages if they don't exist
app.get("/:page", (req, res) => {
  const pageName = req.params.page;
  const filePath = path.join(__dirname, "views", `${pageName}.html`);

  if (!fs.existsSync(filePath)) {
    // Create page dynamically with simple text for now
    fs.writeFileSync(
      filePath,
      `<h1>${pageName} Page</h1><p>This page was created automatically.</p>`
    );
  }
  res.sendFile(filePath);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
