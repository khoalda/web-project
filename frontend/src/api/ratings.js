import instance from "../axios";

export const getProductRatings = (productId) => {
  return instance.get(`/rating/readForProduct.php?pId=${productId}`);
};

export const createProductRating = (data) => {
  return instance.post("/rating/create.php", data);
};

export const updateProductRating = (data) => {
  return instance.put("/rating/update.php", data);
};
