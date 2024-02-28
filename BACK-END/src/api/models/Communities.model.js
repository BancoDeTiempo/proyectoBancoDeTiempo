const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const communitiesSchema = new Schema( {
    name: { 
        type: String, 
        required: true, 
        unique: true
    },
    type: {
      type: String,
      enum: ["private", "public"],
      required: true,
    },
    location: {
        type: Number, 
        required: true, 
        unique: true
    },
    description: {
      type: String,
      required: true,
      //ver cómo podemos meter un máx y un mín de caracteres en la descripción.//
    },
    users: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: "User" }
    ]
  },
  {
    timestamps: true,
  }
);

const Communities = mongoose.model("Communities", communitiesSchema);

module.exports = Communities;