import { useState, useEffect } from "react";
import { readMyOrders } from "../api/orders";

const History = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await readMyOrders();
      setOrders(data);
      console.log(data);
    };
    fetchOrders();
  }, []);

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
        <div className="row align-items-start">
          <div className="col-12 items">
            <div className="card mb-3 shadow">
              <center>
                <div className="row g-0">
                  <div className="col-2 fw-bold">#BK26042023000001</div>
                  <div className="col-2 fw-bold">2023-04-26 00:17:22</div>
                  <div className="col-2 fw-bold">Nguyễn Văn A</div>
                  <div className="col-3 fw-bold">
                    Kí túc xá khu A ĐHQG TP.HCM
                  </div>
                  <div className="col-2 fw-bold">0949586858</div>
                </div>
              </center>

              <center>
                <div
                  className="row g-0"
                  style={{ backgroundColor: "#0a0908", color: "#F2F4F3" }}
                >
                  <div className="col-2 fw-bold">Sản phẩm</div>
                  <div className="col-2 fw-bold ">Số lượng</div>
                  <div className="col-2 fw-bold ">Phí vận chuyển</div>
                  <div className="col-2 fw-bold ">Thành tiền</div>
                  <div className="col-2 fw-bold ">Trạng thái</div>

                  <hr />
                  <div className="col-2 ">
                    Gà
                    <br />
                    Burger
                  </div>
                  <div className="col-2  ">
                    1<br />1
                  </div>
                  <div className="col-2  ">10000</div>
                  <div className="col-2  ">90000</div>
                  <div className="col-2  ">Waiting</div>
                  <div className="col-2">
                    <button type="button" class="btn btn-light">
                      <b>Hủy đơn</b>
                    </button>
                  </div>
                </div>
              </center>
            </div>

            <hr />
          </div>

          <div className="py-4"></div>
        </div>
      </div>
    </div>
  );
};

export default History;
