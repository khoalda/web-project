import React, { useState, useEffect } from "react";
import { readAll } from "../api/products";
import { Categories } from "../constants/categories";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cart";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Pagination from "@mui/material/Pagination";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryFromQuery = query.get("category");
    if (categoryFromQuery) {
      setCategory(categoryFromQuery);
    }
  }, [location]);

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

  const filteredProducts = products
    .filter(
      (product) => category.length === 0 || category.includes(product.Cname)
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
    });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ backgroundColor: "#F2F4F3" }}>
      {/* filter */}
      <div className="container py-5">
        <div className="row" style={{ marginLeft: "0px" }}>
          <div className="col-md-3">
            <b>
              <label
                style={{
                  float: "left",
                  position: "relative",
                  top: "15%",
                  marginRight: "10px",
                }}
              >
                <i className="fa fa-solid fa-tags"></i> Danh mục
              </label>
            </b>
            <select
              style={{
                backgroundColor: "#0a0908",
                color: "#F2F4F3",
                width: "150px",
              }}
              className="form-select"
              aria-label="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Tất cả</option>
              {Categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.value}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5"></div>
          <div className="col-md-1"></div>
          <div className="col-md-3">
            <b>
              <label
                style={{
                  float: "left",
                  position: "relative",
                  top: "15%",
                  marginRight: "10px",
                }}
              >
                <i className="fa fa-solid fa-filter"></i> Sắp xếp
              </label>
            </b>
            <select
              style={{
                backgroundColor: "#0a0908",
                color: "#F2F4F3",
                width: "200px",
              }}
              className="form-select"
              aria-label="Sort by"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="price-asc">Giá: thấp đến cao</option>
              <option value="price-desc">Giá: cao đến thấp</option>
              <option value="name-asc">Tên: A đến Z</option>
              <option value="name-desc">Tên: Z đến A</option>
            </select>
          </div>
        </div>
        {/* products */}

        <div className="container" style={{ backgroundColor: "#F2F4F3" }}>
          <div className="row row-cols-1 py-5 row-cols-md-4 g-4">
            {/* 1 card product */}

            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                {paginatedProducts
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
                    <div className="col" key={product.pId}>
                      <div className="card h-100 shadow-sm">
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
                                {Number(product.price).toLocaleString("de-DE")}{" "}
                                ₫
                              </b>
                            </p>
                          </center>
                        </div>
                        <button
                          type="button"
                          className="btn btn-light fw-bold"
                          onClick={() => {
                            if (!user) {
                              enqueueSnackbar(
                                "Vui lòng đăng nhập để mua hàng",
                                {
                                  variant: "warning",
                                }
                              );
                              navigate("/login");
                              return;
                            }

                            dispatch(addToCart(product));
                            enqueueSnackbar(
                              `Đã thêm ${product.name} vào giỏ hàng`,
                              {
                                variant: "success",
                              }
                            );
                          }}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  ))}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pagination
                    count={Math.ceil(filteredProducts.length / pageSize)}
                    page={currentPage}
                    onChange={(event, value) => handlePageChange(value)}
                  />
                </div>
              </>
            ) : (
              <div className="alert alert-danger" role="alert">
                Không có sản phẩm nào
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
