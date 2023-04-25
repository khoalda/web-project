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
  return instance.post(`/users/updateInfo.php`, payload);
};

export const changeMyPassword = (oldPassWord, newPassWord) => {
  const payload = JSON.stringify({
    oldPassWord: oldPassWord,
    newPassWord: newPassWord,
  });
  return instance.post(`/users/updatePassWord.php`, payload);
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
  return instance.post(`/users/updateInfo.php?aId=${id}`, payload);
};

export const deleteUser = (id) => {
  return instance.delete(`/users/deleteOne.php?aId=${id}`);
};

export const toggleUserStatus = (id) => {
  return instance.put(`/users/updateStatus.php?aId=${id}`);
};
