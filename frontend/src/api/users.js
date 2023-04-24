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
  }

  return instance.post("/users/register.php", JSON.stringify(user));
};

export const logout = () => {
  return instance.post("/users/logout.php");
};
