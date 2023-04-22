import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/users";

<link rel="stylesheet" href="./Login.css"></link>;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div>
      <div className="full-screen-container">
        <div className="login-container">
          <h3 className="login-title">Welcome</h3>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
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
