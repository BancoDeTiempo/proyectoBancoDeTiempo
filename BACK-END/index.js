const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");
const app = express();
dotenv.config();
connect();
const PORT = process.env.PORT;

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//! -----------------------CORS-------------
const cors = require("cors");
app.use(cors());

//! ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

const ServiceRoutes = require("./src/api/routes/Service.routes");
app.use("/api/v1/service/", ServiceRoutes);

const MessageRoutes = require("./src/api/routes/Message.routes");

app.use("/api/v1/message/", MessageRoutes);

const RequestRoutes = require("./src/api/routes/Request.routes");
app.use("/api/v1/request/", RequestRoutes);

const ReviewRoutes = require("./src/api/routes/Review.routes");
app.use("/api/v1/reviews/", ReviewRoutes);

const RatingRoutes = require("./src/api/routes/Rating.routes");
app.use("/api/v1/ratings/", RatingRoutes);

//! --------------- generamos un error de cuando no see encuentre la ruta
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

//! ------------------> cuando el servidor crachea metemos un 500 ----------
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

// esto de aqui  nos revela con que tecnologia esta hecho nuestro back
app.disable("x-powered-by");

app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
