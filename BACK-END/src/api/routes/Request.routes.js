const { isAuth } = require("../../middleware/auth.middleware");
const { create, changeStateRequest } = require("../controllers/Request.controller");


const RequestRoutes = require("express").Router();

RequestRoutes.post("/", [isAuth], create)
RequestRoutes.patch("/changeState", [isAuth], changeStateRequest)


module.exports = RequestRoutes