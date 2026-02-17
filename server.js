require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tmdbRoutes = require("./routes/tmdbRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", tmdbRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
