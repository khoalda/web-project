import React, { useState, useEffect } from "react";
import { readOne } from "../api/products";

export default function Detail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ backgroundColor: "#F2F4F3" }}>
      <div className="container py-5">
        <div
          className="card mb-3 rounded-0 border-0"
          style={{ backgroundColor: "#F2F4F3" }}
        >
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src="https://marketplace.canva.com/EAFB178SOVE/1/0/1600w/canva-crispy-n%E2%80%99-crunchy-fried-chicken-brown-gastronomy-instagram-post-PTNnFAi_dLU.jpg"
                class="img-fluid rounded-0"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <div className="card-body" style={{ marginLeft: "60px" }}>
                <h5 className="py-3">
                  <i class="fa fa-solid fa-tags"></i> Category: Burger
                </h5>

                <h2 className="card-title fw-bold">Burger Mac</h2>
                <h2 className="card-text fw-bold" style={{ color: "#49111C" }}>
                  49.000 ₫
                </h2>
                <hr class="dashed-line" />

                <h4 className="card-text fw-bold">Mô tả</h4>
                <p>Burger đặc biệt nhiều thịt nhiều rau</p>

                <button
                  type="button"
                  class="btn btn-lg"
                  style={{ backgroundColor: "#49111C", color: "#F2F4F3" }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
