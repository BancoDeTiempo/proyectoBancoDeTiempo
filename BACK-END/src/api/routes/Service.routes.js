const { isAuth } = require("../../middleware/auth.middleware");
const {
  createService,
  deleteService,
  getByTag,
  getById,
  update,
  getAll,
} = require("../controllers/Service.controller");
const ServiceRoutes = require("express").Router();

ServiceRoutes.post("/", [isAuth], createService);
ServiceRoutes.delete("/:id", deleteService);
ServiceRoutes.get("/:id", getById);
ServiceRoutes.patch("/:id", update);
ServiceRoutes.get("/", getAll);

module.exports = ServiceRoutes;
