import { extraConfig } from './serviceApiGeneral.config';

/**
 * Necesitamos tener los controladores del back para crear el servicio
 * Cada controlador tendrá su servicio individual, siguiendo también su enrutado
 * Todas tendrán la misma estructura, pero hay que cambiar ciertas claves: los métodos y las rutas
 * El nombre de las variables deben coincidir con las de los controladores**/

//!--------- CREATE ---------

export const createService = async (formData) => {
  const APIGeneral = extraConfig();
  console.log('Entrando', formData);
  return APIGeneral.post(`/service/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

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

export const getByIdService = async (serviceId) => {
  const APIGeneral = extraConfig();

  return APIGeneral.get(`/service/${serviceId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!--------- UPDATE ---------

export const updateService = async (serviceId, formData) => {
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
