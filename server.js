const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://anooppandey937:8iw3I2Q4U8I7rWMB@project0.3ritt7o.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
const newsRouter = require("./routes/news");
app.use("/api/news", newsRouter);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port ${PORT}"));
