import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/users";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/slices/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    dispatch(logoutSuccess());
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary py-1 shadow-sm"
        style={{ backgroundColor: "#F2F4F3" }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            <img
              src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-food-logo-png-image_5687717.png"
              alt="logo"
              style={{ width: "95px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
            </ul>
            <div className="buttons">
              {user ? (
                <>
                  <Link to="/cart" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-shopping-cart me-1"></i>Giỏ hàng (0)
                  </Link>
                  <button
                    className="btn btn-outline-dark ms-2"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-in me-1"></i>Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-dark">
                    <i className="fa fa-sign-in me-1"></i>Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-user-plus me-1"></i>Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
