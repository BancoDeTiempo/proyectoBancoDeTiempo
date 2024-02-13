const { createService, deleteService, getByTag, getById, update } = require("../controllers/Service.controller");


const UserRoutes = require("express").Router();

UserRoutes.post("/", createService)
UserRoutes.delete("/:id", deleteService)
UserRoutes.get("/:tag", getByTag)
UserRoutes.get("/:id", getById)
UserRoutes.patch("/:id", update)

module.exports = UserRoutes

