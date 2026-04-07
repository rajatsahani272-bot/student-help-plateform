// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//ai routes
app.use("/api", aiRoutes);

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});