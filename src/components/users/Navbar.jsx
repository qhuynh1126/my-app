import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <form>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-dark"
          aria-label="Fourth navbar example"
        >
          <div className="container">
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample04"
              aria-controls="navbarsExample04"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbars">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                  <Link
                    className="nav-link px-2 text-white link-button"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
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
