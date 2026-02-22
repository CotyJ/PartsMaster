import { Outlet, NavLink, useLocation } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <div className="container-fluid mx-0">
          <div className="row">
            <div id="nav-dash-container" className="col-auto">
              <nav id="nav-bar" className="row navbar d-flex justify-content-between mt-0 pt-0 align-items-start">
                <ul className="navbar-nav">
                  {/* <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/">Home</NavLink></li> */}
                  <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/parts-table">Parts Lookup</NavLink></li>
                  <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/kb-checkin">To Replenish</NavLink></li>
                  <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/inventory">Inventory</NavLink></li>
                  <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/orders">Orders</NavLink></li>
                  {/* <li className="nav-item navbar-text "><NavLink className="nav-link px-4" to="/parts-receiving">Parts Receiving</NavLink></li> */}
                </ul>
              </nav>
            </div>
          <div className="col m-2"><Outlet /></div>
        </div>
      </div>
    </>
  )
}
