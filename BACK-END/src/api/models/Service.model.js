const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    title: [{ type: String, required: true }],
    offerer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*-----> usuario que lo publicó
    endedContractEndService: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    ], //*----> contratos finalizados de este servicio
    //*----> popularlo a contratos
    tag: [
      {
        type: String,
        enum: [
          "limpieza",
          "mascotas",
          "personas",
          "recados",
          "transporte",
          "reparaciones",
          "cuidado",
          "compra",
          "electrónica",
          "mecánica",
          "eventos",
          "otros",
        ],
        required: true,
      },
    ],
    description: [{ type: String, required: true }],
    request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
