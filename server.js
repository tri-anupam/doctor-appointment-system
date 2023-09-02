const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: ["https://doctor-appointment-system-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://doctor-appointment-system-frontend.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//dotenv config
dotenv.config();

//mongoDB connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.get("/", (req, res) => {
  res.status(200).send("Hello from server side");
});
const port = 8000;
//listen port
app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} mode on port ${port}`
  );
});
