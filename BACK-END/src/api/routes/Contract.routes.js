const { isAuth } = require("../../middleware/auth.middleware");
const { createContract, updateAccept, updateRechazar } = require("../controllers/Contract.controller");

const ContractRoutes = require("express").Router();
ContractRoutes.post("/", [isAuth], createContract)
ContractRoutes.patch("/update/acceptedByUser/:contract", [isAuth], updateAccept)
ContractRoutes.patch("/update/rejectByUser/:contract", [isAuth], updateRechazar)

module.exports = ContractRoutes
