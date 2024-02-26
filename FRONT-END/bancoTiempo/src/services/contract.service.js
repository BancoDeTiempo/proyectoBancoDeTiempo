import { extraConfig } from "./serviceApiGeneral.config";

//! ------------------ CREATE ------------------
export const createContract = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.post(`/contracts/createContract/`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------ UPDATE ------------------
export const updateContrat = async (contractId, formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.patch(`/contracts/${contractId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//tenemos un update de contrato para aceptar, otro para rechazar, y otro para "finalizar servicio" (daruma completado). Hay que hacer 3 rutas por ello?

//! ------------------ DELETE ------------------
export const deleteContract = async (contractId) => {
  const APIGeneral = extraConfig();

  return APIGeneral.delete(`/contracts/${contractId}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------- GET by ID -----------------
export const getContractById = async (contractId) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/${contractId}`)
    .then((res) => res)
    .catch((error) => error);
};

/*
//! ---------------- GET by USER ONE ----------------
export const getByUserOne = async (userOneId) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/byUserOne/${userOneId}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------- GET by USER TWO ----------------
export const getByUserTwo = async (userTwoId) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/byUserTwo/${userTwoId}`)
    .then((res) => res)
    .catch((error) => error);
};
*/

//! ------------------ GET ALL ------------------
export const getAllContracts = async () => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------- SORT -------------------
export const sortContracts = async (method, value) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/sort/contracts/${method}/${value}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------ FILTER ------------------
export const filterContracts = async (filter, min, max) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/filter/contracts/${filter}/${min}/${max}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------ FILTER STATE ------------------
export const filterEnumState = async (filter, value) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/contracts/filterEnumState/contracts/${filter}/${value}`)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------ FILTER STATUS DARUMA ------------------
export const filterStatusDaruma = async (filter, Number) => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.get(`/contracts/filterStatusDaruma/contracts/${filter}/${Number}`)
      .then((res) => res)
      .catch((error) => error);
  };