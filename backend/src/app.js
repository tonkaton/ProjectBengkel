const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5000",
      "https://app-botakengine.miftadigital.cloud",
      "http://app-botakengine.miftadigital.cloud",
      "https://botakengine.miftadigital.cloud",
      "http://botakengine.miftadigital.cloud",
    ],
    credentials: true,
  }),
);
app.use(express.json()); // Parse JSON body

// Routes yang udah ada
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/push", require("./routes/pushRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/vehicles", require("./routes/vehiclesRoutes"));
app.use("/api/rewards", require("./routes/rewardsRoutes"));

// Root route
app.get("/", (req, res) => res.json({ message: "API Bengkel Motor OK" }));

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: err.message,
  });
});

module.exports = app;
