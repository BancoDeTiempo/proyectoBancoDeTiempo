import { updateToken } from '../utils/updateToken';
import { extraConfig } from './serviceApiGeneral.config';
//import { googleUser } from "./serviceGoogle.config";-

//*--------------------- USER ----------------------------

//! --------
//? REGISTER
//! --------

export const register = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/user/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
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

export const checkNewUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('user/check', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? RESEND CODE
//! -----------

export const resendCode = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/user/resend', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------
//? AUTOLOGIN
//! ---------

export const autoLogin = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('user/login/autologin', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----
//? LOGIN
//! -----

export const login = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('user/login', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------
//? FORGOT PASSWORD
//! ---------------

export const changePassword = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('/user/forgotpassword', formData)
    .then((res) => res)
    .catch((error) => error);
};

//*--------------------------------------------------------------------------------
//*---------------------------------- CON AUTH -------------------------------------
//*--------------------------------------------------------------------------------

//! ---------------
//? CHANGE PASSWORD
//! ---------------

export const modifyPassword = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('/user/changepassword', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? UPDATE USER
//! -----------

export const update = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('user/update/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? DELETE USER
//! -----------

export const deleteUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete('/user/deleteUser', formData)
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
export const getById = async (id) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/user/${id}`)
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

export const followUserToggle = async (idUserToFollow) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/user/follow/${idUserToFollow}`)
    .then((res) => res)
    .catch((error) => error);
};

//!----
//? BAN
//!----

export const bannedToggle = async (idUserToBan) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/user/ban/${idUserToBan}`)
    .then((res) => res)
    .catch((error) => error);
};
