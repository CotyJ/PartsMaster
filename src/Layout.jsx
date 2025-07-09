import { Outlet, Link } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/parts-table">Parts Lookup</Link></li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
      </nav>

      {/* <Outlet /> */}
    </>
  )
}
