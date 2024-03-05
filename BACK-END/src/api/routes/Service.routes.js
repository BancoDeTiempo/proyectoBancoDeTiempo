const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  createService,
  deleteService,
  getAll,
  getByIdService,
  updateService,
  getByKeyword,
} = require("../controllers/Service.controller");
const ServiceRoutes = require("express").Router();

ServiceRoutes.post("/", [isAuth], upload.single("image"), createService);
ServiceRoutes.delete("/:id", deleteService);
ServiceRoutes.get("/:id", getByIdService);
ServiceRoutes.patch("/:id", updateService);
ServiceRoutes.get("/", getAll);
ServiceRoutes.get("/getbykeyword/:keyword", getByKeyword);

module.exports = ServiceRoutes;
