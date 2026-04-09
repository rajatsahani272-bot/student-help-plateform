// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const { syncInternships } = require("./Controller/internshipController");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", aiRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api", internshipRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// ✅ FIRST SYNC (safe)
setTimeout(async () => {
  try {
    await syncInternships();
  } catch (err) {
    console.log("Initial sync failed:", err.message);
  }
}, 3000);


// ✅ AUTO SYNC (har 1 hour me)
setInterval(async () => {
  try {
    await syncInternships();
  } catch (err) {
    console.log("Auto sync failed:", err.message);
  }
}, 1000 * 60 * 60);