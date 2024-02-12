const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema(
    {
        userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        serviceOne: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        serviceTwo: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        complete: { type: Number, enum: [0, 1, 2] },
        dueDate: { type: Date, required: true }
    },
    {
        timestamps: true,
    }
);

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;