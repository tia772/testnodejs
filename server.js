const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbConfig = require("./app/config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello Crud Node Express" });
});

app.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
const CategoryRoute = require("./app/api/routes/category.routes");
app.use("/category", CategoryRoute);
const NoteRoute = require("./app/api/routes/note.routes");
app.use("/note", NoteRoute);
