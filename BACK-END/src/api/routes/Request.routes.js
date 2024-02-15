const { isAuth } = require("../../middleware/auth.middleware");
const { create, changeStateRequest, getAll, getById } = require("../controllers/Request.controller");


const RequestRoutes = require("express").Router();

RequestRoutes.post("/", [isAuth], create)
RequestRoutes.patch("/changeState", [isAuth], changeStateRequest)
RequestRoutes.get("/", getAll);
RequestRoutes.get("/:id", getById);

module.exports = RequestRoutes