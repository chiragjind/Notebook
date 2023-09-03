import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
   const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate({ pathname: '/Login' })
   }
    const location= useLocation();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-12 mx-auto">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                Chirag
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} to="/About">
                        About
                      </Link>
                    </li>
                  </ul>
                  {
                    !localStorage.getItem('token')?
                    <div className="d-flex p-2 pe-5">
                    <Link to="/Login"><button className="nav-link bg-dark me-2 fs-5" style={{color:"white"}}>Login</button></Link>
                    <Link to="/Register"><button className="nav-link bg-dark me-2 fs-5" style={{color:"white"}}>Sign up</button></Link></div>: <Link to="/Register"><button className="nav-link bg-dark me-2 fs-5" onClick={handlelogout} style={{color:"white"}}>Logout</button></Link> 
                  }
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
