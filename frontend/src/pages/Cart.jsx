import React from 'react'
<link rel="stylesheet" href="./Cart.css"></link>;


const Cart = () => {
  return (
    <div>
        <div class="container">
          <h1 className='py-5 fw-bold'>Your Cart</h1>
            <div class="row align-items-start">
              <div class="col-12 col-sm-8 items">
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-3">
                    <img src="https://marketplace.canva.com/EAFB178SOVE/1/0/1600w/canva-crispy-n%E2%80%99-crunchy-fried-chicken-brown-gastronomy-instagram-post-PTNnFAi_dLU.jpg" class="img-fluid rounded-start" alt="..."/>
                  </div>
                  <div class="col-md-5" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Gà Giòn Không Xương</h6>
                    </div>
                  </div>
                  <div class="col-md-2" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">1</h6>
                    </div>
                  </div>
                  <div class="col-md-2" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">45.000₫</h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>

              {/* san pham moi */}
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-3">
                    <img src="https://marketplace.canva.com/EAFId9YclVc/1/0/1600w/canva-pizza-delicious-instagram-post-I_b_OQJOWog.jpg" class="card-img-top" alt="..."/>
                  </div>
                  <div class="col-md-5" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Pizza Thịt Xông Khói</h6>
                    </div>
                  </div>
                  <div class="col-md-2" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">1</h6>
                    </div>
                  </div>
                  <div class="col-md-2" style={{paddingTop: "10%"}}>
                    <div class="card-body">
                      <h6 class="card-title fw-bold">129.000₫</h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
            </div>
            
            {/* total card */}
            <div class="col-12 col-sm-4 p-3 card" style={{backgroundColor: "#0a0908"}}>
              <div class="row g-0" style={{color: "#F2F4F3"}}>
              <div class="col-12 py-3">
                <div class="mb-3">
                  <label class="form-label">Tên</label>
                  <input type="text" class="form-control" placeholder="Name" style={{width: "100%"}}/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Địa chỉ</label>
                  <input type="text" class="form-control" placeholder="Address" style={{width: "100%"}}/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Số điện thoại</label>
                  <input type="text" class="form-control" placeholder="Phone" style={{width: "100%"}}/>
                </div>
                </div>
                <hr/>
                <div class="col-9 py-3">
                  <p>Tổng đơn hàng</p>
                  <p>Phí giao hàng</p>
                  <p className='fw-bold'>Tổng thanh toán</p>
                </div>
                <div class="col-3 py-3">
                  <p>174.000₫</p>
                  <p>10.000₫</p>
                  <p className='fw-bold'>184.000₫</p>
                </div>
                <hr/>
                <a type="button" class="btn btn-light btn-block fw-bold" style={{width: "100%"}} href="/checkout">Thanh Toán</a>
              </div>
            </div>

            <div className='py-4'></div>
          </div>
        </div>
        </div>
  )
}

export default Cart