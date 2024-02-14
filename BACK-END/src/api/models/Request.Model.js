const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        userOneOwnerService: {
            type: Number,
        },
        userTwo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        accepted: { type: Boolean },
        state: { type: String, enum: [pending, complete] }
    },
    { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
