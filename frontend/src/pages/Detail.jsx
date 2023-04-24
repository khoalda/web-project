import React, { useState, useEffect } from "react";
import { readOne } from "../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cart";
import { useSnackbar } from "notistack";

export default function Detail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
                <h5 className="py-3">
                  <i className="fa fa-solid fa-tags"></i> Danh mục:{" "}
                  {product.Cname}
                </h5>

                <h2 className="card-title fw-bold">{product.name}</h2>
                <h2 className="card-text fw-bold" style={{ color: "#49111C" }}>
                  {Number(product.price).toLocaleString("de-DE")} ₫
                </h2>
                <hr className="dashed-line" />

                <h4 className="card-text fw-bold">Mô tả</h4>
                <p>{product.description}</p>

                <button
                  type="button"
                  className="btn btn-lg"
                  style={{ backgroundColor: "#49111C", color: "#F2F4F3" }}
                  onClick={() => {
                    dispatch(addToCart(product));
                    enqueueSnackbar(
                      `Thêm ${product.name} vào giỏ hàng thành công!`,
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
          </div>
        </div>
      </div>
    </div>
  );
}
