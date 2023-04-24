import React, { useState } from "react";
import { register } from "../api/users";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password, name, phoneNumber);
      dispatch({ type: "AUTH_SUCCESS", payload: response.data });
      enqueueSnackbar("Đăng ký tài khoản thành công", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Đăng ký tài khoản thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      {user && <Navigate to="/login" replace={true} />}

      <div className="full-screen-container-rg">
        <div className="login-container">
          <h3 className="login-title">Đăng ký tài khoản</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
