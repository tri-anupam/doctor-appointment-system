const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

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
app.use(
  cors({
    origin: ["https://doctor-appointment-system-api.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

const port = process.env.PORT || 8000;
//listen port
app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
  );
});
