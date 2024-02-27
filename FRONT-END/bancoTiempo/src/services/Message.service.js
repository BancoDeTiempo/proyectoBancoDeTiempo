import { extraConfig } from './serviceApiGeneral.config';

//! ----------------
//? GET ALL MESSAGES
//! ----------------

export const getAllMessages = async () => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/message/`)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------------
//? GET MESSAGE BY ID
//! -----------------

export const getMessageById = async (id) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/message/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

//! --------------
//? CREATE MESSAGE
//! --------------

export const createMessage = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.post(`/message/${idRecipient}`, formData)
    .then((res) => res)
    .catch((error) => error);
};
