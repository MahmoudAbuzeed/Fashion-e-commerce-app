const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// routes
const authRoutes = require("./routes/UserRoutes/auth");
const adminRoutes = require("./routes/AdminRoutes/auth");
const categoryRoutes = require("./routes/UserRoutes/category");
const productRoutes = require("./routes/UserRoutes/product");
const cartRoutes = require("./routes/UserRoutes/cart");
const orderRoutes = require("./routes/UserRoutes/order");
const initialDataRoutes = require("./routes/AdminRoutes/initialData");
const adminOrderRoute = require("./routes/AdminRoutes/order");
const adminPageRoute = require("./routes/AdminRoutes/page");
const addressRoutes = require("./routes/UserRoutes/address");
const { handleError } = require("./Shared/lib/error");
const logger = require("./Shared/lib/logger");
const expressRequestId = require("express-request-id")();
const requestLogger = require("./Shared/lib/requestLogger");
const { PAGE_NOT_FOUND } = require("./Shared/Constant");
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
app.use(expressRequestId);
app.use(requestLogger);
// ----------- Middlewares ----------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", orderRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", adminPageRoute);
app.use("/api", addressRoutes);

app.use((req, res) => {
  logger.error(req.method, req.originalUrl, PAGE_NOT_FOUND);
  return handleError({ statusCode: 404, message: PAGE_NOT_FOUND }, res);
});

app.use((err, req, res, next) => {
  logger.error(err);
  handleError(err, res);
});
