import React, { useState, useEffect } from "react";
import { readAll } from "../api/products";
import { Categories } from "../constants/categories";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");

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
          ) : (
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
