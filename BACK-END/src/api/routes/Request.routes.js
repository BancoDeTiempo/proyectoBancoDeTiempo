const { isAuth } = require("../../middleware/auth.middleware");
const { create, changeStateRequest, getAll, getById, deleteRequest } = require("../controllers/Request.controller");


const RequestRoutes = require("express").Router();

RequestRoutes.post("/", [isAuth], create)
RequestRoutes.patch("/changeState", [isAuth], changeStateRequest)
RequestRoutes.get("/", getAll);
RequestRoutes.get("/:id", getById);
RequestRoutes.delete("/deleteRequest/:id", [isAuth], deleteRequest)

module.exports = RequestRoutes