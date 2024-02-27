import { extraConfig } from "./serviceApiGeneral.config";

//! ------------------ GET ALL CHATS ------------------
export const getUserChats = async () => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.get(`/chats/`)
      .then((res) => res)
      .catch((error) => error);
  };

//! ------------------ GET CHAT BY ID ------------------
export const getChatByID = async (id) => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.get(`/chats/${id}`)
      .then((res) => res)
      .catch((error) => error);
  };