//! LE HE LLAMADO SERVICIO PORQUE CABE LA POSIBILIDAD DE QUE USEMOS SERVICE EN LA ARQUITECTURA

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        offerer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*-----> usuario que lo publicó
        offeree: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*---->usuario que lo recibió al final
        //*----> popularlo a contratos
        category: [{
            type: String, enum: [
                "hogar",
                "mascotas",
                "personas",
                "recados",
                "transporte",
                "reparaciones",
                "servicios profesionales"
            ]
        }],
        subcategory: [{
            type: String, enum: [
                "reparaciones",
                "limpieza",
                "cocina",
                "estética",
                "cuidado",
                "paseo",
                "acompañamiento",
                "recogida/entrega",
                "compra",
                "personas",
                "cosas",
                "electrónica",
                "mecánica"

            ]
        }],
        description: [{ type: String, required: true }],
        timesPerformed: [{ type: Number, required: true, /**ME PASA IGUAL QUE CON EL DE ARRIBA */ }],
        userInterested: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;

