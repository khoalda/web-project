import React, { useState, useEffect } from "react";
import { readAllOrders, updateOrderStatus } from "../../api/orders";
import { orderNameMap } from "../../constants/orders";
import { useSnackbar } from "notistack";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const { data } = await readAllOrders();
    setOrders(data);
    console.log(data);
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      style={{
        backgroundColor: "#CDC0B4",
        backgroundImage:
          "linear-gradient(to left top, #CDC0B4 50%, #F7F6F4 50%)",
      }}
    >
      <div className="container">
        <h2 className="py-5 fw-bold">Lịch sử đặt hàng</h2>
        {orders.map((order) => (
          <div key={order.oId} className="row align-items-start">
            <div className="col-12 col-sm-8 items">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        <center>Mã đơn hàng</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        <center>Thời gian đặt hàng</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        <center>Họ tên</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        <center>Địa chỉ</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">
                        <center>Số điện thoại</center>
                      </h6>
                    </div>
                  </div>
                  <hr />

                  <div className="col-md-3">
                    <div className="card-body">
                      <h6 className="card-title ">
                        <center>#{order.oId}</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title">
                        <center>{order.time.toLocaleString()}</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title">
                        <center>{order.name}</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-body">
                      <h6 className="card-title">
                        <center>{order.address}</center>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <h6 className="card-title">
                        <center>{order.phoneNumber}</center>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* total card */}
            <div
              className="col-12 col-sm-4 p-3 card"
              style={{ backgroundColor: "#0a0908" }}
            >
              <div className="row g-0" style={{ color: "#F2F4F3" }}>
                <div className="col py-3">
                  {Object.keys(order)
                    .filter((key) => /^\d+$/.test(key))
                    .map((key) => order[key])
                    .map((item) => (
                      <div className="row">
                        <div className="col-8">{item.name}</div>
                        <div className="col-4">{item.count}</div>
                      </div>
                    ))}
                </div>
                <hr />
                <div className="col-8 py-3">
                  <p className="fw-bold">Phí giao hàng</p>
                  <p className="fw-bold">Tổng đơn hàng</p>
                  <p className="fw-bold">Trạng thái</p>
                </div>
                <div className="col-4 py-3">
                  <p>{order.deliveryCost}₫</p>
                  <p>{order.totalPrice}₫</p>
                  <span
                    style={
                      order.statusName === "Waiting"
                        ? {
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "orange",
                          }
                        : order.statusName === "Confirmed"
                        ? {
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "green",
                          }
                        : {
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "red",
                          }
                    }
                  >
                    {orderNameMap[order.statusName]}
                  </span>
                </div>
                <hr />
                {order.statusName === "Waiting" && (
                  <button
                    type="button"
                    className="btn btn-light btn-block fw-bold"
                    style={{ width: "100%" }}
                    onClick={() => {
                      updateOrderStatus({
                        oId: order.oId,
                        statusId: 3,
                      })
                        .then((res) => {
                          enqueueSnackbar("Hủy đơn hàng thành công", {
                            variant: "success",
                          });
                          fetchOrders();
                        })
                        .catch((err) => {
                          enqueueSnackbar("Hủy đơn hàng thất bại", {
                            variant: "error",
                          });
                        });
                    }}
                  >
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            </div>
            <div className="py-3"></div>
            <hr />
            <div className="py-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
