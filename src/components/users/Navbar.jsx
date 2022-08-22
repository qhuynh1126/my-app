import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <form>
        <nav
          className="navbar navbar-expand-lg bg-light"
        >
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarsExample04">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link px-2 text-white link-button"
                    to="/games"
                  >
                    Games
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </form>
    </React.Fragment>
  );
}

export default Navbar;
