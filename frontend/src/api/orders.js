import instance from "../axios";

export const createOrder = (data) => {
  const payload = JSON.stringify(data);
  return instance.post("/ordering/create.php", payload);
};
