const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema(
    {
        userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // Es quien ha hecho la búsqueda en el buscador y le ha mandado la solicitud a otro usuario
        userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // Es quien acepta esa solicitud (quien hace el Match)
        serviceOne: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        serviceTwo: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        comments: { type: String, required: false },
        dueDate: { type: Date, required: true }, // fecha limite en la que se tiene que realizar ambos servicios
        acceptedByUserOne: { type: Boolean, required: true },
        acceptedByUserTwo: { type: Boolean, required: true },
        rejectedByUserOne: { type: Boolean, required: true },
        rejectedByUserTwo: { type: Boolean, required: true },
        statusDaruma: { type: Number, enum: [0, 1, 2], required: true },  //estado de compleción del contrato donde 0 = sin ojos; 1 = 1 ojo; 2 = ojos == finalizado
        finalizedByUserOne: { type: Boolean, required: true },
        finalizedByUserTwo: { type: Boolean, required: true },
        specialCondicion: { type: String },
        state: { type: String, enum: ["pendiente", "finalizado", "en curso", "caducado"], default: "pendiente" }
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;