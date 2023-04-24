import React, {useState, useEffect} from 'react';


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <div className='hero'>
        <div className="card bg-dark text-white border-0">
            <img src="https://marketplace.canva.com/EAFBpF3naY8/1/0/1600w/canva-black-and-orange-restaurant-%26-fast-food-facebook-cover-BaA2IgkXmyM.jpg" className="card-img-top" alt="..."/>
            <div className="card-img-overlay"></div>
        </div>
        <div style={{backgroundColor: "#0a0908"}}>
          <div className='mx-5' style={{color: "#F2F4F3"}}>
            <h2 className='py-5'>BEST SELLER</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
                <div className="card">
                <img src="https://marketplace.canva.com/EAFB178SOVE/1/0/1600w/canva-crispy-n%E2%80%99-crunchy-fried-chicken-brown-gastronomy-instagram-post-PTNnFAi_dLU.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <center>
                        
                            <p className="card-title fw-bold" style={{color: "#49111C"}}>GÀ RÁN</p>
                    </center>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                <img src="https://marketplace.canva.com/EAFFqXXzD04/1/0/1600w/canva-black-collage-burger-instagram-post-OhD-VQZY6VU.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <center>
                      <p className="card-title fw-bold" style={{color: "#49111C"}}>HAMBURGER</p>
                    </center>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                <img src="https://marketplace.canva.com/EAFEGX8wGLA/2/0/1600w/canva-black-%26-yellow-simple-healthy-salad-food-menu-instagram-post-3a9t17pX05s.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <center>
                            <p className="card-title fw-bold" style={{color: "#49111C"}}>SALAD</p>
                    </center>
                </div>
                </div>
            </div>
            </div>

          </div>
        </div>
        <div className='py-5' style={{backgroundColor: "#0a0908"}}></div>
    </div>
  )
}

export default Home;