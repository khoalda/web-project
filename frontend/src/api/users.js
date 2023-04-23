import instance from "../axios";

export const login = (username, password) => {
  const user = {
    username: username,
    password: password,
  };

  return instance.post("/users/login.php", JSON.stringify(user));
};

export const register = (username, email, password) => {
  return instance.post("/users/register.php", {
    username,
    email,
    password,
  });
};

export const logout = () => {
  return instance.post("/users/logout.php");
};
