import { extraConfig } from './serviceApiGeneral.config';

//!-------------- CREATE ----------------------------

export const createRating = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.post('/ratings/', formData)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------- UPDATE ----------------------------

export const updateRating = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.patch('/ratings/updateRating', formData)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------- DELETE ----------------------------

export const deleteRating = async () => {
  const APIGeneral = extraConfig();

  return APIGeneral.delete('/ratings/')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------- UPDATE GLOBAL RATING ----------------------------

export const updateGlobalRating = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.patch('/ratings/updateGlobalRating', formData)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------- GET ALL ----------------------------

export const getAllRating = async () => {
  const APIGeneral = extraConfig();

  return APIGeneral.get('/ratings/')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------- GET BY ID ----------------------------

export const getByIdRating = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get('/ratings/', formData)
    .then((res) => res)
    .catch((error) => error);
};
