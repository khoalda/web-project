import React from 'react'
<link rel="stylesheet" href="./Login.css"></link>;

export default function Register() {
  return (
    <div>
        <div class="full-screen-container-rg">
        <div class="login-container">
            <h3 class="login-title">Register</h3>
            <form>
            <div class="input-group">
                <label>Name</label>
                <input type="text"/>
            </div>
            <div class="input-group">
                <label>Username</label>
                <input type="text"/>
            </div>
            <div class="input-group">
                <label>Email</label>
                <input type="email"/>
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password"/>
            </div>
            <div class="input-group">
                <label>Birthday</label>
                <input type="date"/>
            </div>
            <div class="input-group">
                <label>Address</label>
                <input type="text"/>
            </div>
            <div class="input-group">
                <label>Phone Number</label>
                <input type="text"/>
            </div>
            <button type="submit" class="login-button">Register</button>
            </form>
        </div>
        </div>
    </div>
  )
}
