const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
// const userRoutes = require("./routes/users-routes");
const app = express();
app.use(bodyParser.json());
app.use("/api/places", placesRoutes); // => /api/places/...
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});
// app.use("/user", userRoutes);
app.listen(5000);
