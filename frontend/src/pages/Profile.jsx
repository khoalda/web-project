import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateMyInfo } from "../api/users";
import { useSnackbar } from "notistack";
import { updateInfo } from "../redux/slices/auth";

export default function Profile() {
  const { user, info } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [currentInfo, setCurrentInfo] = useState({
    name: info?.name || "",
    phoneNumber: info?.phoneNumber || "",
    dateOfBirth: info?.dateOfBirth || "",
    urlAvatar: info?.urlAvatar || "",
    email: info?.email || "",
    address: info?.address || "",
  });

  useEffect(() => {
    if (info) {
      setCurrentInfo({
        ...currentInfo,
        ...info,
      });
    }
  }, [info]);

  return (
    <div style={{ backgroundColor: "#F2F4F3" }}>
      {!user && <Navigate to="/" replace={true} />}

      <div className="container py-5">
        <div
          className="card shadow"
          style={{ backgroundColor: "#A9927D", borderColor: "#D3D3D3" }}
        >
          <div className="row g-0">
            <div
              className="col-md-3 py-2"
              style={{ backgroundColor: "#A9927D", color: "#F2F4F3" }}
            >
              <center>
                <div className="py-3">
                  <img
                    src={currentInfo.urlAvatar || "/images/avatar.png"}
                    alt="Avatar"
                    style={{
                      width: "145px",
                      height: "145px",
                      borderRadius: "50%",
                      marginTop: "50px",
                      position: "relative",
                    }}
                  />
                  <sup>
                    <button
                      className="btn btn-dark"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                      }}
                    >
                      +
                    </button>
                  </sup>
                </div>
                <div className="py-3"></div>
                <b>
                  <h5 className="py-1">Username: {info?.username}</h5>
                  <p>
                    <i className="fa fa-solid fa-star"></i> Level: 1
                  </p>
                </b>
              </center>
            </div>
            <div className="col-md-9" style={{ backgroundColor: "#F2F4F3" }}>
              <div className="py-2"></div>
              <center>
                <h3 className="py-2 fs-bold">
                  <b>THÔNG TIN TÀI KHOẢN</b>
                </h3>
              </center>
              <hr />
              <div className="container" style={{ marginLeft: "20px" }}>
                <b>
                  THÔNG TIN CÁ NHÂN <div className="py-2"></div>
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Họ tên</label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          value={currentInfo.name}
                          onChange={(event) => {
                            setCurrentInfo({
                              ...currentInfo,
                              name: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        Ngày sinh
                      </label>
                      <div className="col-md-6">
                        <input
                          type="date"
                          className="form-control"
                          value={currentInfo.dateOfBirth}
                          onChange={(event) => {
                            setCurrentInfo({
                              ...currentInfo,
                              dateOfBirth: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        Số điện thoại
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          value={currentInfo.phoneNumber}
                          onChange={(event) => {
                            setCurrentInfo({
                              ...currentInfo,
                              phoneNumber: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Email</label>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          value={currentInfo.email}
                          onChange={(event) => {
                            setCurrentInfo({
                              ...currentInfo,
                              email: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Địa chỉ</label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          value={currentInfo.address}
                          onChange={(event) => {
                            setCurrentInfo({
                              ...currentInfo,
                              address: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="py-3"></div>
                  </form>
                  <button
                    type="submit"
                    className="btn btn-dark border-0 shadow"
                    style={{ backgroundColor: "#A9927D" }}
                    onClick={() => {
                      console.log(currentInfo);
                      updateMyInfo(currentInfo)
                        .then((res) => {
                          console.log(res);
                          if (res) {
                            enqueueSnackbar("Cập nhật thông tin thành công!", {
                              variant: "success",
                            });
                            dispatch(updateInfo(currentInfo));
                          } else {
                            enqueueSnackbar("Cập nhật thông tin thất bại!", {
                              variant: "error",
                            });
                          }
                        })
                        .catch((err) => {
                          enqueueSnackbar("Cập nhật thông tin thất bại!", {
                            variant: "error",
                          });
                        });
                    }}
                  >
                    Cập nhật
                  </button>
                  <hr />
                  THAY ĐỔI MẬT KHẨU <div className="py-3"></div>
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        Mật khẩu cũ
                      </label>
                      <div className="col-md-6">
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        Mật khẩu mới
                      </label>
                      <div className="col-md-6">
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        Nhập lại mật khẩu
                      </label>
                      <div className="col-md-6">
                        <input type="password" className="form-control" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark border-0 shadow"
                      style={{ backgroundColor: "#A9927D" }}
                    >
                      Thay đổi
                    </button>

                    <div className="py-3"></div>
                  </form>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
