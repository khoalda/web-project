import React from 'react'
<link rel="stylesheet" href="./Login.css"></link>;

export default function () {
  return (
    <div>
        <div class="full-screen-container">
      <div class="login-container">
        <h3 class="login-title">Welcome</h3>
        <form>
          <div class="input-group">
            <label>Username</label>
            <input type="text" />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" />
          </div>
          <button type="submit" class="login-button">Log In</button>
        </form>
      </div>
    </div>
    </div>
  )
}
