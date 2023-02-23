const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const httpError = require("./Models/http-error");
const app = express();
app.use(bodyParser.json());
app.use("/api/places", placesRoutes); // => /api/places/...
app.use("/api/users", userRoutes); // => /api/users/...
app.use((req, res, next) => {
  const error = new httpError("Could not find this Routes.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});
// app.use("/user", userRoutes);
mongoose
  .connect(
    "mongodb+srv://mahin:arrafimahin@cluster0.tikxfav.mongodb.net/Place?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
