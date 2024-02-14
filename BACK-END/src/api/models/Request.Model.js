const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

        requestUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        accepted: { type: Boolean, default: false },
        state: { type: String, enum: ["pending", "accepted"], default: "pending" }
    },
    { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
