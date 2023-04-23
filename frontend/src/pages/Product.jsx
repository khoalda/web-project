import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readAll } from "../api/products";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await readAll();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div style={{ backgroundColor: "#F2F4F3" }}>
      {/* filter */}
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary py-1"
        style={{ backgroundColor: "#0a0908" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="#"
                ></Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-lg btn-dark rounded-0"
                  to="/product/beverage"
                  style={{ color: "#F2F4F3" }}
                >
                  Beverages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-lg btn-dark rounded-0"
                  to="/product/burger"
                  style={{ color: "#F2F4F3" }}
                >
                  Burgers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-lg btn-dark rounded-0"
                  to="/product/chicken"
                  style={{ color: "#F2F4F3" }}
                >
                  Chickens
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-lg btn-dark rounded-0"
                  to="/product/potato"
                  style={{ color: "#F2F4F3" }}
                >
                  Potato
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-lg btn-dark rounded-0"
                  to="/product/salad"
                  style={{ color: "#F2F4F3" }}
                >
                  Salads
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* products */}

      <div className="container" style={{ backgroundColor: "#F2F4F3" }}>
        <div className="row row-cols-1 py-5 row-cols-md-4 g-4">
          {/* 1 card product */}

          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            products.map((product) => (
              <div className="col">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <center>
                      <p
                        className="card-title fw-bold"
                        style={{ color: "#49111C" }}
                      >
                        {product.name} <br />
                        <b className="fw-bold">{product.price} ₫</b>
                      </p>
                    </center>
                  </div>
                  <button type="button" className="btn btn-light fw-bold">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
