const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const shortid = require("shortid");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://username:password@cluster0.mongodb.net/link-shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = shortid.generate();
  await ShortUrl.create({ full: fullUrl, short: shortUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const url = await ShortUrl.findOne({ short: shortUrl });
  if (!url) return res.sendStatus(404);

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));