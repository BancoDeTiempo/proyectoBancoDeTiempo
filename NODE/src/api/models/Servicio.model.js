//! LE HE LLAMADO SERVICIO PORQUE CABE LA POSIBILIDAD DE QUE USEMOS SERVICE EN LA ARQUITECTURA

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        offerer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*-----> usuario que lo publicó
        offeree: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //*---->usuario que lo recibió
        //*----> he metido unas pocas categ/subcatg porque creo que debe haber una forma más sencilla de hacerlo---->
        //?-----> exportación del util a lo mejor??
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
        searchRecount: [{ type: Number, required: true, /**CREO QUE SERÍA UN CONTROLADOR U OTRO MODELO*/ }], //todo: hablarlo con Pedro
        timesPerformed: [{ type: Number, required: true, /**ME PASA IGUAL QUE CON EL DE ARRIBA */ }],
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;

