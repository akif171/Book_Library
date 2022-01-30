const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

//ENV Setup
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//MongoDB Connection
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to MongoDB"));

// Middlewares
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//Route Middlewares
app.use("/", indexRouter);
app.use("/authors", authorRouter);

//App Listener
app.listen(process.env.PORT || 3000);
