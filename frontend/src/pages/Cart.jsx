import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { createOrder } from "../api/orders";

import {
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
} from "../redux/slices/cart";

const Cart = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const decrementItem = (item) => {
    dispatch(decrementCartItem(item));
  };

  const incrementItem = (item) => {
    dispatch(incrementCartItem(item));
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div>
      {!user && <Navigate to="/login" replace={true} />}
      <div className="container">
        <h1 className="py-5 fw-bold">Your Cart</h1>
        <div className="row align-items-start">
          <div className="col-12 col-sm-8 items">
            {cartItems.map((item) => (
              <div key={item.name} className="card mb-3">
                <div className="row g-0">
                  <div
                    className="col-md-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt={item.name}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        objectPosition: "center center",
                      }}
                    />
                  </div>
                  <div className="col-md-4" style={{ paddingTop: "10%" }}>
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="card-title fw-bold mb-0">{item.name}</h6>
                        {item.quantity === 0 && (
                          <button
                            onClick={() => removeItem(item)}
                            className="btn btn-outline-danger btn-sm mt-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => decrementItem(item)}
                          className="btn btn-outline-secondary btn-sm me-2"
                        >
                          -
                        </button>
                        <span className="fw-bold me-2">{item.quantity}</span>
                        <button
                          onClick={() => incrementItem(item)}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2" style={{ paddingTop: "10%" }}>
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        {Number(item.price).toLocaleString("de-DE")}₫
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2" style={{ paddingTop: "10%" }}>
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        {(item.price * item.quantity).toLocaleString("de-DE")}₫
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>

          {/* total card */}
          <div
            className="col-12 col-sm-4 p-3 card"
            style={{ backgroundColor: "#0a0908" }}
          >
            <div className="row g-0" style={{ color: "#F2F4F3" }}>
              <div className="col-12 py-3">
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <hr />
              <div className="col-9 py-3">
                <p>Tổng đơn hàng</p>
                <p>Phí giao hàng</p>
                <p className="fw-bold">Tổng thanh toán</p>
              </div>
              <div className="col-3 py-3">
                <p>{totalPrice.toLocaleString("de-DE")}₫</p>
                <p>10.000₫</p>
                <p className="fw-bold">
                  {(totalPrice + 10000).toLocaleString("de-DE")}₫
                </p>
              </div>
              <hr />
              <a
                type="button"
                className="btn btn-light btn-block fw-bold"
                style={{ width: "100%" }}
                href="/checkout"
              >
                Thanh Toán
              </a>
            </div>
          </div>

          <div className="py-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
