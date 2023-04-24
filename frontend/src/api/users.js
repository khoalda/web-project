import instance from "../axios";

export const login = (username, password) => {
  const user = {
    username: username,
    password: password,
  };

  return instance.post("/users/login.php", JSON.stringify(user));
};

export const register = (username, password, name, phoneNumber) => {
  const user = {
    username: username,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
  };

  return instance.post("/users/register.php", JSON.stringify(user));
};

export const logout = () => {
  return instance.post("/users/logout.php");
};

export const readMyInfo = () => {
  return instance.get("/users/readOne.php");
};

export const updateMyInfo = (data) => {
  const payload = JSON.stringify(data);

  // {
  //   "name": "Khoa Lai",
  //   "phoneNumber": "0905335297",
  //   "dateOfBirth": "",
  //   "urlAvatar": "",
  //   "email": "",
  //   "address": ""
  // }

  return instance.post(`/users/updateInfo.php`, payload);
};

// ================== Admin ==================
export const readAllUsers = () => {
  return instance.get("/users/readAll.php");
};

export const readUser = (id) => {
  return instance.get(`/users/readOne.php?aId=${id}`);
};

export const updateUserInfo = (id, data) => {
  const payload = JSON.stringify(data);

  // {
  //   "name": "Khoa Lai",
  //   "phoneNumber": "0905335297",
  //   "dateOfBirth": "",
  //   "urlAvatar": "",
  //   "email": "",
  //   "address": ""
  // }

  return instance.post(`/users/updateInfo.php?aId=${id}`, payload);
};
