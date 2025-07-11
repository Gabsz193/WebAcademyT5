const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/data", (req, res) => {
  const jsonData = req.body;
  console.log("Received JSON: ", jsonData);
  res.json({ message: "JSON received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Express server listening on: http://localhost:${PORT}`);
});
