import { extraConfig } from './serviceApiGeneral.config';

/**
 * Necesitamos tener los controladores del back para crear el servicio
 * Cada controlador tendrá su servicio individual, siguiendo también su enrutado
 * Todas tendrán la misma estructura, pero hay que cambiar ciertas claves: los métodos y las rutas
 * El nombre de las variables deben coincidir con las de los controladores**/

//!--------- CREATE ---------

export const createService = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.post(`/service/`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//!--------- DELETE ---------

export const deleteService = async (serviceId, formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.delete(`/service/${serviceId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//!--------- GET BY ID ---------

export const getById = async (serviceId, formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/service/${serviceId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//!--------- UPDATE ---------

export const update = async (serviceId, formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.patch(`/service/${serviceId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//!--------- GET ALL ---------

export const getAll = async (formData) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/service/`, formData)
    .then((res) => res)
    .catch((error) => error);
};
