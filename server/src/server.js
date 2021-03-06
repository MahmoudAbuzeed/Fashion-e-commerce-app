const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const initialDataRoutes = require("./routes/admin/initialData");
const adminOrderRoute = require("./routes/admin/order");
const adminPageRoute = require("./routes/admin/page");
const addressRoutes = require("./routes/address");

env.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ---------- Server config ---------- //
app.listen(PORT, () => {
  console.log(`Server run on port : ${PORT}`);
});

// ---------- DataBase config ----------- //

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log(`Failed to connect to database : ${err}`);
});

// ----------- Middlewares ----------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", adminPageRoute);
app.use("/api", addressRoutes);
