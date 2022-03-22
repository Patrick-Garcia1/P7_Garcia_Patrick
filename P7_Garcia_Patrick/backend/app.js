const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const messagesRoutes = require("./routes/messages.Routes");
const commentairesRoutes = require("./routes/commentaires.Routes");
const userRoutes = require("./routes/user.Routes");
require("dotenv").config({ path: "./config/.env" });
app.use(helmet());
//----------------------------------------------------------------------------------
// CORS
//----------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // https://github.com/helmetjs/helmet/issues/176
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/messages", commentairesRoutes);

module.exports = app;
