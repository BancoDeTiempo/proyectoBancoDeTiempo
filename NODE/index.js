const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");
const app = express();
dotenv.config();
connect();
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

const ServiceRoutes = require("./src/api/routes/Service.routes")
app.use("/api/v1/service/", ServiceRoutes)

const MessageRoutes = require("./src/api/routes/Message.routes")
app.use("/api/v1/message/", MessageRoutes)