import React from 'react'
<link rel="stylesheet" href="./App.css"></link>


export default function Footer() {
  return (
    <div>
        <div className="d-flex flex-column h-100">

        <footer className="w-100 py-4 flex-shrink-0" style={{backgroundColor: "#0A0908"}}>
            <div className="container py-4">
                <div className="row gy-4 gx-5" >
                    <div className="col-lg-2 col-md-6">
                        
                        <img src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-food-logo-png-image_5687717.png" className="mb-0" style={{width: "125px"}}/>
                        <p className="small text-muted mb-0">&copy; Copyrights 2015.</p>
                    </div>
                    <div className="col-lg-3 col-md-6" style={{color: "#F2F4F3"}}>
                        <h5 className="text-white mb-3">FOLLOW US</h5>
                        <button className="btn" style={{color: "#F2F4F3"}} type="button" id="button-addon2">
                                <i className="fa fa-instagram" style={{fontSize: "36px"}}/>
                        </button>
                        <button className="btn" style={{color: "#F2F4F3"}} type="button" id="button-addon2">
                                <i className="fa fa-facebook" style={{fontSize: "32px"}}/>
                        </button>
                        <button className="btn" style={{color: "#F2F4F3"}} type="button" id="button-addon2">
                                <i className="fa fa-youtube" style={{fontSize: "36px"}}/>
                        </button>
                        <button className="btn" style={{color: "#F2F4F3"}} type="button" id="button-addon2">
                                <i className="fa fa-twitter" style={{fontSize: "36px"}}/>
                        </button>
                    </div>
                    <div className="col-lg-3 col-md-6" style={{color: "#F2F4F3"}}>
                        <img src="https://jollibee.com.vn/images/bocongthuong.png" className="mb-0" style={{width: "220px"}}/>
                    </div>
                    <div className="col-lg-4 col-md-6" style={{color: "#F2F4F3"}}>
                        <h5 className="text-white mb-3">CÔNG TY LIÊN DOANH TNHH BK RESTAURANT VIỆT NAM</h5>
                        <p className="small text-muted">Số XX Thủ Đức, TP. Hồ Chí Minh.<br/>
                        Điện thoại: (028) 38489828 <br/>
                        Email: lienhe@bkrstvietnam.com.vn <br/>
                        Mã số thuế: 0100773885
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    </div>
  )
}


