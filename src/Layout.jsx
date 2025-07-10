import { Outlet, Link } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <div className="container-fluid mx-0">
          <div className="row">
            <div className="col-auto">
              <nav className="row navbar d-flex justify-content-between mt-0 pt-0" id="nav-bar">
                <ul className="navbar-nav">
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/">Home</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/parts-table">Parts Lookup</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/orders">Orders</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/kb-checkin">Kanban</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/parts-receiving">Parts Receiving</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/parts-receiving">ECO's</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/parts-receiving">Purchase Orders</Link></li>
                  <li className="nav-item navbar-text "><Link className="nav-link px-4" to="/parts-receiving">Inventory</Link></li>
                </ul>
              </nav>
            </div>
          <div className="col m-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
