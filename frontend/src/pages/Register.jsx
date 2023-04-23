import React from 'react'
<link rel="stylesheet" href="./Login.css"></link>;

export default function Register() {
  return (
    <div>
        <div className="full-screen-container-rg">
        <div className="login-container">
            <h3 className="login-title">Register</h3>
            <form>
            <div className="input-group">
                <label>Name</label>
                <input type="text"/>
            </div>
            <div className="input-group">
                <label>Username</label>
                <input type="text"/>
            </div>
            <div className="input-group">
                <label>Email</label>
                <input type="email"/>
            </div>
            <div className="input-group">
                <label>Password</label>
                <input type="password"/>
            </div>
            <div className="input-group">
                <label>Birthday</label>
                <input type="date"/>
            </div>
            <div className="input-group">
                <label>Address</label>
                <input type="text"/>
            </div>
            <div className="input-group">
                <label>Phone Number</label>
                <input type="text"/>
            </div>
            <button type="submit" className="login-button">Register</button>
            </form>
        </div>
        </div>
    </div>
  )
}
