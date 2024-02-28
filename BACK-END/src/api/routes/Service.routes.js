const { isAuth } = require("../../middleware/auth.middleware");
const {
  createService,
  deleteService,
  getAll,
  getByIdService,
  updateService,
} = require("../controllers/Service.controller");
const ServiceRoutes = require("express").Router();

ServiceRoutes.post("/", [isAuth], createService);
ServiceRoutes.delete("/:id", deleteService);
ServiceRoutes.get("/:id", getByIdService);
ServiceRoutes.patch("/:id", updateService);
ServiceRoutes.get("/", getAll);

module.exports = ServiceRoutes;
