import React from 'react'

const Product = () => {
  return (
    <div style={{backgroundColor: "#F2F4F3"}}>
      {/* filter */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-1" style={{backgroundColor: "#0a0908"}}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5" >
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"></a>
              </li>
              <li className="nav-item">
                <a className="btn btn-lg btn-dark rounded-0" href="/product/beverage" style={{color: "#F2F4F3"}}>Beverages</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-lg btn-dark rounded-0" href="/product/burger" style={{color: "#F2F4F3"}}>Burgers</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-lg btn-dark rounded-0" href="/product/chicken" style={{color: "#F2F4F3"}}>Chickens</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-lg btn-dark rounded-0" href="/product/potato" style={{color: "#F2F4F3"}}>Potato</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-lg btn-dark rounded-0" href="/product/salad" style={{color: "#F2F4F3"}}>Salads</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* products */}

      <div className='container' style={{backgroundColor: "#F2F4F3"}}>
      <div className="row row-cols-1 py-5 row-cols-md-4 g-4">

        {/* 1 card product */}

        <div className="col">
            <div className="card">
            <img src="https://marketplace.canva.com/EAFB178SOVE/1/0/1600w/canva-crispy-n%E2%80%99-crunchy-fried-chicken-brown-gastronomy-instagram-post-PTNnFAi_dLU.jpg" class="card-img-top" alt="..."/>
            <div className="card-body">
                <center>
                  <p className="card-title fw-bold" style={{color: "#49111C"}}>
                    CHICKEN MEDIUM <br/>
                    <b className='fw-bold'>45.000 ₫</b>
                  </p>
                </center>
                
            </div>
            <button type="button" className="btn btn-light fw-bold">Thêm vào giỏ hàng</button>
            </div>
        </div>


        <div className="col">
            <div class="card">
            <img src="https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw34f047d3/images/598177/SCA_598177_hi-res.jpg?sw=1000&sh=1000&sm=fit" class="card-img-top" alt="..."/>
            <div className="card-body">
                <center>
                  <p className="card-title fw-bold" style={{color: "#49111C"}}>
                    COCACOLA <br/>
                    <b className='fw-bold'>15.000 ₫</b>
                  </p>
                </center>
                
            </div>
            <button type="button" className="btn btn-light fw-bold">Thêm vào giỏ hàng</button>
            </div>
        </div>

        <div className="col">
            <div className="card">
            <img src="https://marketplace.canva.com/EAFB178SOVE/1/0/1600w/canva-crispy-n%E2%80%99-crunchy-fried-chicken-brown-gastronomy-instagram-post-PTNnFAi_dLU.jpg" class="card-img-top" alt="..."/>
            <div className="card-body">
                <center>
                  <p className="card-title fw-bold" style={{color: "#49111C"}}>
                    CHICKEN MEDIUM <br/>
                    <b className='fw-bold'>45.000 ₫</b>
                  </p>
                </center>
                
            </div>
            <button type="button" className="btn btn-light fw-bold">Thêm vào giỏ hàng</button>
            </div>
        </div>


        <div className="col">
            <div class="card">
            <img src="https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw34f047d3/images/598177/SCA_598177_hi-res.jpg?sw=1000&sh=1000&sm=fit" class="card-img-top" alt="..."/>
            <div className="card-body">
                <center>
                  <p className="card-title fw-bold" style={{color: "#49111C"}}>
                    COCACOLA <br/>
                    <b className='fw-bold'>15.000 ₫</b>
                  </p>
                </center>
                
            </div>
            <button type="button" className="btn btn-light fw-bold">Thêm vào giỏ hàng</button>
            </div>
        </div>
            
          </div>
      </div>
      
    </div>
  )
}

export default Product