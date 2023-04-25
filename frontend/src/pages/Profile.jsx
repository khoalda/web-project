import React, { useState, useEffect } from "react";

export default function Profile() {
    
  return (
    <div style={{ backgroundColor: "#F2F4F3" }}>
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
                    src="https://img.hoidap247.com/picture/answer/20210427/large_1619529081459.jpg"
                    alt="Avatar"
                    style={{
                      width: "145px",
                      borderRadius: "50%",
                      marginTop: "50px",
                      position: "relative"
                    }}
                  />
                  <sup>
                    <button 
                      className="btn btn-dark"
                      style={{position: "absolute", 
                      top: "50%", 
                      left: "50%", 
                      transform:"translate(-50%, -50%)",
                      borderRadius: "50%"}}>
                        +
                    </button>
                  </sup>
                </div>
                <div className="py-3"></div>
                <b>
                  <h5 className="py-1">Username: hfjsjf</h5>
                  <p>
                    <i class="fa fa-solid fa-star"></i> Level: 1
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
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Họ tên</label>
                      <div class="col-md-6">
                        <input type="text" class="form-control" value={"Nguyễn Lê Cát Khánh"} />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Ngày sinh</label>
                      <div class="col-md-6">
                        <input type="date" class="form-control" value={"2022-12-22"} />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Số điện thoại</label>
                      <div class="col-md-6">
                        <input type="text" class="form-control" value={"028358398"} />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Email</label>
                      <div class="col-md-6">
                        <input type="email" class="form-control" value={"jhrsh@gmail.com"} />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Địa chỉ</label>
                      <div class="col-md-6">
                        <input type="text" class="form-control" value={"jkafhksfkhnksfk"} />
                      </div>
                    </div>

                    <div className="py-3"></div>
                  </form>
                  <hr />
                  THAY ĐỔI MẬT KHẨU <div className="py-3"></div>
                  <form>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">Mật khẩu cũ</label>
                      <div class="col-md-6">
                        <input type="password" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">
                        Mật khẩu mới
                      </label>
                      <div class="col-md-6">
                        <input type="password" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-md-3 col-form-label">
                        Nhập lại mật khẩu
                      </label>
                      <div class="col-md-6">
                        <input type="password" class="form-control" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-dark border-0 shadow"
                      style={{ backgroundColor: "#A9927D" }}
                    >
                      Cập nhật thông tin
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
