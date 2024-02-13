const { createService, deleteService, getByTag, getById, update } = require("../controllers/Service.controller");
const ServiceRoutes = require("express").Router();

ServiceRoutes.post("/", createService)
ServiceRoutes.delete("/:id", deleteService)
ServiceRoutes.get("/:tag", getByTag)
ServiceRoutes.get("/:id", getById)
ServiceRoutes.patch("/:id", update)

module.exports = ServiceRoutes

