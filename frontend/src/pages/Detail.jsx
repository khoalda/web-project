import React, { useState, useEffect } from "react";
import { readOne } from "../api/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cart";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { categoryMapper } from "../constants/categories";

export default function Detail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth);

  const pId = window.location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await readOne(pId).then((res) => {
        setProduct(res.data);
        console.log(res.data);
      });
      setLoading(false);
    };
    fetchProduct();
  }, [pId]);

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
                src={`/${product.image}`}
                className="img-fluid rounded-0"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <div className="card-body" style={{ marginLeft: "60px" }}>
                <div
                  className="card container border-0 shadow"
                  style={{ backgroundColor: "#A9927D", color: "#F2F4F3" }}
                >
                  <h5 className="py-4">
                    <i className="fa fa-solid fa-tags"></i> Danh mục:{" "}
                    <Link
                      style={{
                        color: "#F2F4F3",
                      }}
                      to={`/product?category=${product.Cname}`}
                    >
                      {categoryMapper(product.Cname)}
                    </Link>
                  </h5>

                  <h2 className="card-title fw-bold">{product.name}</h2>
                  <h2
                    className="card-text fw-bold"
                    style={{ color: "#5E503F" }}
                  >
                    {Number(product.price).toLocaleString("de-DE")} ₫
                  </h2>
                  <hr className="dashed-line" />

                  <h4 className="card-text fw-bold">Mô tả</h4>
                  <p>{product.description}</p>

                  <button
                    type="button"
                    className="btn btn-lg"
                    style={{ backgroundColor: "#5E503F", color: "#F2F4F3" }}
                    onClick={() => {
                      if (!user) {
                        enqueueSnackbar("Vui lòng đăng nhập để mua hàng", {
                          variant: "warning",
                        });
                        navigate("/login");
                        return;
                      }

                      dispatch(addToCart(product));
                      enqueueSnackbar(`Đã thêm ${product.name} vào giỏ hàng`, {
                        variant: "success",
                      });
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <div className="py-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
