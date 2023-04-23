import React from 'react'

const Product = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary py-1" style={{backgroundColor: "#0a0908"}}>
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fs-5" >
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"></a>
              </li>
              <li class="nav-item">
                <a class="btn btn-lg btn-dark rounded-0" href="/product/beverage" style={{color: "#F2F4F3"}}>Beverages</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-lg btn-dark rounded-0" href="/product/burger" style={{color: "#F2F4F3"}}>Burgers</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-lg btn-dark rounded-0" href="/product/chicken" style={{color: "#F2F4F3"}}>Chickens</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-lg btn-dark rounded-0" href="/product/potato" style={{color: "#F2F4F3"}}>Potato</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-lg btn-dark rounded-0" href="/product/salad" style={{color: "#F2F4F3"}}>Salads</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='container' style={{backgroundColor: "#0a0908"}}>
        
      </div>
      
    </div>
  )
}

export default Product