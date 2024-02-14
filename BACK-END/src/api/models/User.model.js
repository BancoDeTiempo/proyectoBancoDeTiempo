const bcrypt = require(`bcrypt`);
const validator = require(`validator`);
const mongoose = require(`mongoose`);
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, `Email not valid`],
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validator: [validator.isStrongPassword, `Password`],
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros"],
      required: true,
    },
    dateOfBirth: {
      type: Number,
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    confirmationCode: {
      type: String,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    banned: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedByApp: { type: Boolean, default: false },
    commentsPublicByOther: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    ],
    reviewedByYou: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    reviewedByOthers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    postedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], //* mensajes que yo hago
    offeredServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }], //* el servicio que yo ofrezco
    //soughtServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],//Las peticiones pentientes
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], //* los ratng que he hecho al usuario 
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Communities" }], //* a la comunidad que pertenezco
    pendingRequestMyService: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }], //* request que estan pendiente de mis servicios- me los han pedido a mi
    pendingRequestedService: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }], //* request que yo he pedido de otros servicios de otras personas
    acceptedRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }], //* request que estan aceptadas
    /// cuando relacionamos un modelo de con otro lo hacemos con populate y el ref a otro modelo
    pendingContract: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }], //* contratos pendites de aceptar
    acceptedContract: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }], //* contratos aceptados por ambos
    completedService: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }], //* contatos cumplidos por ambas partes

  },

  {
    timestamps: true,
  }
);

UserSchema.pre(`save`, async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(`Error hashing password`, error);
  }
});

const User = mongoose.model(`User`, UserSchema);
module.exports = User;
