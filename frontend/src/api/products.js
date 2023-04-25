import instance from "../axios";

export const readAll = () => {
  return instance.get("/products/readAll.php");
};

export const readOne = (id) => {
  return instance.get(`/products/readOne.php?pId=${id}`);
};

// ====================== admin ======================
export const create = (data) => {
  return instance.post("/products/create.php", data);
}

export const update = (data) => {
  return instance.put("/products/update.php", data);
}

export const deleteOne = (id) => {
  return instance.delete(`/products/deleteOne.php?pId=${id}`);
}
