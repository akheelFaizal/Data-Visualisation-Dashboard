const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dataRoutes = require("./routes/dataroutes"); 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
