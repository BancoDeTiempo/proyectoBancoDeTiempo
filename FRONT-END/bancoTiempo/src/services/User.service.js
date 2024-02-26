import { updateToken } from "../utils/updateToken";
import { extraConfig } from "./serviceApiGeneral.config";
//import { googleUser } from "./serviceGoogle.config";-

//*--------------------- USER ----------------------------

//! --------
//? REGISTER
//! --------

export const registerUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// export const registerUserWithGoogle = async (formData) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.post("/users/register/registerGoogle", formData)
//     .then((res) => res)
//     .catch((error) => error);
// };

// export const registerGoogle = async (token) => {
//   const APIGeneral = googleUser(token);

//   return APIGeneral.then((res) => res).catch((error) => error);
//};

//! ----------------------------
//? VERIFY CODE - CHECK NEW USER
//! ----------------------------

export const verifyConfirmationCode = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post("users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? RESEND CODE
//! -----------

export const resendConfirmationCode = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------
//? AUTOLOGIN
//! ---------

export const autoLoginUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post("users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----
//? LOGIN
//! -----

export const loginUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post("users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------
//? FORGOT PASSWORD
//! ---------------

export const forgotPasswordNoAuth = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(
    "/users/changeUserPassword/changeUserPassword",
    formData
  )
    .then((res) => res)
    .catch((error) => error);
};

//*--------------------------------------------------------------------------------
//*---------------------------------- CON AUTH -------------------------------------
//*--------------------------------------------------------------------------------

//! ---------------
//? CHANGE PASSWORD
//! ---------------

export const changePasswordAuth = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch("/users/changepassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? UPDATE USER
//! -----------

export const updateUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch("users/update/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? DELETE USER
//! -----------

export const deleteUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete("/users/deleteUser", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* GET USER ------------------------------
// //! -----------
// //? GET BY NAME
// //! -----------
// export const getUserByName = async (userName) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.get(`/users/byName/${userName}`)
//     .then((res) => res)
//     .catch((error) => error);
// };

//! ---------
//? GET BY ID
//! ---------
export const getUserById = async (id) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/users/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// //! -------
// //? GET ALL
// //! -------
export const getAll = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/users/`)
    .then((res) => res)
    .catch((error) => error);
};

// //!-------- ADD FAVS ---------------

// export const addFavComment = async (idComment) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.patch(`/users/likeComment/${idComment}`)
//     .then((res) => res)
//     .catch((error) => error);
//};
//!-------
//? FOLLOW
//!-------

export const addFollow = async (idUserToFollow) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/users/follow/${idUserToFollow}`)
    .then((res) => res)
    .catch((error) => error);
};

//!----
//? BAN
//!----

export const addBanned = async (idUserToBan) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/users/ban/${idUserToBan}`)
    .then((res) => res)
    .catch((error) => error);
};
