import instance from "../axios";

export const readAll = () => {
  return instance.get("/products/readAll.php");
};

export const readOne = (id) => {
  return instance.get(`/products/readOne.php?pId=${id}`);
};
