import { extraConfig } from "./serviceApiGeneral.config";

//! ------------------ UPDATE ------------------
export const updateReview = async (reviewId, formData) => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.patch(`/reviews/Reviews/${reviewId}`, formData)
      .then((res) => res)
      .catch((error) => error);
  };

  //! ------------------ DELETE ------------------

  export const deleteReview = async (reviewId) => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.delete(`/Reviews/deleteReviews/${reviewId}`)
      .then((res) => res)
      .catch((error) => error);
  };

  //! ----------------- GET by ID -----------------
export const getReviewById = async (reviewId) => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.get(`/reviews/${reviewId}`)
      .then((res) => res)
      .catch((error) => error);
  };

  //! ------------------ GET ALL ------------------
export const getAllReviews = async () => {
    const APIGeneral = extraConfig();
  
    return APIGeneral.get(`/reviews/getAllReviews/`)
      .then((res) => res)
      .catch((error) => error);
  };