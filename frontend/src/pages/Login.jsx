import React from "react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../api/users";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/auth";

<link rel="stylesheet" href="./Login.css"></link>;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    login(username, password)
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
        });
        sessionStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/");
        dispatch(loginSuccess(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      {user && <Navigate to="/" replace={true} />}
      <div className="full-screen-container">
        <div className="login-container">
          <h3 className="login-title">Xin chào</h3>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="input-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
