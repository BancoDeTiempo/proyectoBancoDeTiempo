import { extraConfig } from "./serviceApiGeneral.config";

//!--------- CREATE ---------

export const create = async (formData) => {
    const APIGeneral = extraConfig();

    return APIGeneral.post(`/request/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res)
        .catch((error) => error);
};

//!--------- CHANGE STATE REQUEST ---------
//?-----> aceptar o no la req

export const changeStateRequest = async (formData) => {
    const APIGeneral = extraConfig();

    return APIGeneral.patch(`/request/changeState`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res)
        .catch((error) => error);
};


//!--------- GET ALL ---------

export const getAll = async (formData) => {
    const APIGeneral = extraConfig();

    return APIGeneral.get(`/request/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res)
        .catch((error) => error);
};

//!--------- GET BY ID ---------

export const getById = async (formData) => {
    const APIGeneral = extraConfig();

    return APIGeneral.get(`/request/${roomId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => res)
        .catch((error) => error);
};