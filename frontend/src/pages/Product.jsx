import React, { useState, useEffect } from "react";
import { readAll } from "../api/products";
import { Categories } from "../constants/categories";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cart";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const dispatch = useDispatch();

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
      <select
        className="form-select"
        aria-label="Filter by category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All categories</option>
        {Categories.map((category) => (
          <option value={category.name}>{category.value}</option>
        ))}
      </select>

      <select
        className="form-select"
        aria-label="Sort by"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="">Default sorting</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>

      {/* products */}

      <div className="container" style={{ backgroundColor: "#F2F4F3" }}>
        <div className="row row-cols-1 py-5 row-cols-md-4 g-4">
          {/* 1 card product */}

          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : products && products.length > 0 ? (
            products
              .filter(
                (product) =>
                  category.length === 0 || category.includes(product.Cname)
              )
              .sort((a, b) => {
                switch (sortType) {
                  case "price-asc":
                    return a.price - b.price;
                  case "price-desc":
                    return b.price - a.price;
                  case "name-asc":
                    return a.name.localeCompare(b.name);
                  case "name-desc":
                    return b.name.localeCompare(a.name);
                  default:
                    return 0;
                }
              })
              .map((product) => (
                <div className="col">
                  <div className="card h-100">
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "100%",
                      }}
                    >
                      <img
                        src={product.image}
                        className="card-img-top position-absolute w-100 h-100"
                        alt="..."
                        style={{
                          objectFit: "contain",
                          objectPosition: "center center",
                        }}
                      />
                      <div className="card-img-overlay">
                        <Link to={`/product/${product.pId}`}>
                          <button type="button" onClick={() => {}}>
                            Xem chi tiết
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <center>
                        <p
                          className="card-title fw-bold"
                          style={{ color: "#49111C" }}
                        >
                          {product.name} <br />
                          <b className="fw-bold">
                            {Number(product.price).toLocaleString("de-DE")} ₫
                          </b>
                        </p>
                      </center>
                    </div>
                    <button
                      type="button"
                      className="btn btn-light fw-bold"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="alert alert-danger" role="alert">
              Không có sản phẩm nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
