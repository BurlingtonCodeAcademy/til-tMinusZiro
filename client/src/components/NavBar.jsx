import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      {/* Header Site Title and sub-title */}
      <header>
        <div id="header-title">
          <h1>Today I Learned</h1>
          <h3>Personal Journal</h3>
        </div>
        {/*Nav Bar Links in header */}
        <nav>
          <Link className="nav-item" to={"/"}>
            <h2>Entry</h2>
          </Link>
          <Link className="nav-item" to={"/facts"}>
            <h2>Journal</h2>
          </Link>
        </nav>
        {/* <form action="">
          <input type="text" placeholder="SEARCH" />
        </form> */}
      </header>
    </div>
  );
};

export default NavBar;
