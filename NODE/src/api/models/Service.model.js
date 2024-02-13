const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        title: [{ type: String, required: true }],
        offerer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*-----> usuario que lo publicó
        offeree: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*---->usuario que lo recibió al final
        //*----> popularlo a contratos
        tag: [{
            type: String, enum: [
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
                "eventos"
            ],
            required: true
        }],
        description: [{ type: String, required: true }],
        timesPerformed: [{ type: Number }],//?----> populado con user ???
        userInterested: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true,
    }
);


const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
