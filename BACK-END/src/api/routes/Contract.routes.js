const { isAuth } = require("../../middleware/auth.middleware");
const {
  createContract,
  updateAccept,
  updateRechazar,
  updateExpired,
  updateEndService,
} = require("../controllers/Contract.controller");

const ContractRoutes = require("express").Router();
ContractRoutes.post("/", [isAuth], createContract);
ContractRoutes.patch("/update/acceptedByUser/:contract", [isAuth], updateAccept);
ContractRoutes.patch( "/update/rejectByUser/:contract", [isAuth], updateRechazar);
ContractRoutes.patch("/updateExpired/:contractId", [isAuth], updateExpired); 
ContractRoutes.patch("/updateEndService/:contractId", [isAuth], updateEndService);

module.exports = ContractRoutes;
