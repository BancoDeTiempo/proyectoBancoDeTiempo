const { isAuth } = require("../../middleware/auth.middleware");
const { createService, deleteService, getByTag, getById, update } = require("../controllers/Service.controller");
const ServiceRoutes = require("express").Router();

ServiceRoutes.post("/", [isAuth], createService)
ServiceRoutes.delete("/:id", deleteService)
ServiceRoutes.get("/:id", getById)
ServiceRoutes.patch("/:id", update)

module.exports = ServiceRoutes

