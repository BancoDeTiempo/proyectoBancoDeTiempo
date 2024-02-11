const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema(
    {
        message: [{ type: String, required: true, unique: false }],
        userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        serviceOne: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        serviceTwo: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        content: { type: String, required: true, unique: true },
        /**
         * Los campos que queríamos poner aquí (especificaciones, cuerpo contrato, etc)
         * creo que sería mejor que lo detallemos y hagamos un modelo en el front
         */
        dueDate: { type: Date, required: true }
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;