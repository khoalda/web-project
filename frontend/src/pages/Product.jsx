import React from 'react'

const Product = () => {
  return (
    <div>
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

      <div className='container' style={{backgroundColor: "#0a0908"}}>
        
      </div>
      
    </div>
  )
}

export default Product