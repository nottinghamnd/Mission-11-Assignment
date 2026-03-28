import { NavLink } from 'react-router-dom';

function SiteNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/books">
          Bookstore
        </NavLink>

        <div className="navbar-nav">
          <NavLink className="nav-link" to="/books">
            Browse Books
          </NavLink>
          <NavLink className="nav-link" to="/cart">
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default SiteNavbar;
