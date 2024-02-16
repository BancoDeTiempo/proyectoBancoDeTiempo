const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractSchema = new Schema(
    {
        userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // Es quien ha hecho la búsqueda en el buscador y le ha mandado la solicitud a otro usuario
        userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // Es quien acepta esa solicitud (quien hace el Match)
        serviceOne: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        serviceTwo: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        comments: [{ type: String, required: false }],
        dueDate: { type: Date }, // fecha limite en la que se tiene que realizar ambos servicios
        acceptedByUserOne: { type: Boolean, required: true, default: false },
        acceptedByUserTwo: { type: Boolean, required: true, default: false },
        rejectedByUserOne: { type: Boolean, required: true, default: false },
        rejectedByUserTwo: { type: Boolean, required: true, default: false },
        statusDaruma: { type: Number, enum: [0, 1, 2], required: true, default: 0 },  //estado de compleción del contrato donde 0 = sin ojos; 1 = 1 ojo; 2 = ojos == finalizado
        finalizedByUserOne: { type: Boolean, required: true, default: false },
        finalizedByUserTwo: { type: Boolean, required: true, default: false },
        specialCondicion: { type: String },
        state: { type: String, enum: ["pendiente", "finalizado", "en curso", "rechazado", "caducado"], default: "pendiente" }
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;