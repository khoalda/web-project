import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/users";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/slices/auth";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

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
            {(!user || (user && user.level === "1")) && (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/")}`} to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/product")}`}
                    to="/product"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/about")}`}
                    to="/about"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/news")}`} to="/news">
                    Tin tức
                  </Link>
                </li>
              </ul>
            )}

            {user && user.level === "2" && (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/product")}`}
                    to="/admin/product"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/user")}`}
                    to="/admin/user"
                  >
                    Người dùng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/order")}`}
                    to="/admin/order"
                  >
                    Đơn hàng
                  </Link>
                </li>
              </ul>
            )}

            <div className="buttons">
              {user ? (
                <>
                  <Link to="/profile">
                    <img
                      src="https://img.hoidap247.com/picture/answer/20210427/large_1619529081459.jpg"
                      alt="Avatar"
                      style={{ width: "35px", borderRadius: "50%" }}
                      className="me-3"
                    />
                  </Link>

                  {user.level === "1" && (
                    <Link to="/cart" className="btn btn-lg" style={{borderRadius: "20%" }}>
                      <i className="fa fa-shopping-cart fa-lg"></i><sup>(
                      {cartItems.length})</sup>
                    </Link>
                  )}

                  <button
                    className="btn btn-btn-lg" 
                    onClick={handleLogout}
                  >
                    <i className="fa fa-power-off fa-lg"></i>
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
