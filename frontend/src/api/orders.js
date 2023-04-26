import instance from "../axios";

export const createOrder = (data) => {
  //   const payload = JSON.stringify(data);
  return instance.post("/ordering/create.php", data);
};

export const readMyOrders = (userId) => {
  return instance.get(`/ordering/readForAccount.php`);
};

// =================== ADMIN ===================
export const readAllOrders = () => {
  return instance.get("/ordering/readAll.php");
};

export const updateOrderStatus = (data) => {
  return instance.post("/ordering/updateStatus.php", data);
  // {
  //   oId: 1234, // Replace with the order ID you want to update
  //   statusId: 2 // Replace with the status ID you want to set
  // }
};
